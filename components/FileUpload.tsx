"use client";
import config from "@/lib/config";
import {
  ImageKitProvider,
  Image as ImageKitImage,
  Video,
  upload,
} from "@imagekit/next";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const {
  env: {
    imagekit: { urlEndpoint, publicKey },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to authenticate image upload: ${error.message}`);
  }
};
interface Props {
  type: "image" | "video";
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}
const FileUpload = ({
  type,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {
  const [fileUrl, setFileUrl] = useState<string | null>(value || null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-slate-500",
  };
  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
      });
      return;
    }

    const file = fileInput.files[0];
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload a file that is less than 20MB in size",
          variant: "destructive",
        });
        return;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload a file that is less than 50MB in size",
          variant: "destructive",
        });
        return;
      }
    }
    setFileUrl(null); // Reset previous preview

    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError: any) {
      toast({
        title: "Authentication Failed",
        description: authError.message,
      });
      return;
    }

    const { signature, expire, token } = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        useUniqueFileName: true,
        folder: folder,
        onProgress: (event) => {
          setProgress(0);
          setProgress(Math.round((event.loaded / event.total) * 100));
        },
      });

      console.log("Upload response:", uploadResponse);
      if (uploadResponse.url) {
        setFileUrl(uploadResponse.url);
        onFileChange(uploadResponse.url);
        toast({
          title: `${type} Upload Successful`,
          description: `File "${file.name}" uploaded successfully.`,
        });
      }
    } catch (error: any) {
      toast({
        title: `${type} Upload Failed`,
        description: error?.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      <input type="file" ref={fileInputRef} className="hidden" />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          if (fileInputRef.current) {
            fileInputRef.current.click();
          }
        }}
        className={cn(
          "w-full rounded-md flex flex-col bg-dark-300 text-white py-4 px-2",
          styles.button
        )}
      >
        <div className="w-full flex mb-1 justify-center gap-2">
          <Image
            src="/icons/upload.svg"
            alt="Upload Icon"
            height={20}
            width={20}
          />
          <span className={cn("font-bold", styles.placeholder)}>
            {placeholder}
          </span>
        </div>
        {fileUrl && <p className="upload-filename text-black">{fileUrl}</p>}
      </button>
      {progress > 0 && progress !== 100 && (
        <div className="w-full bg-green-200 rounded-full">
          <div
            className="progress p-2 tracking-widest"
            style={{ width: `${progress}%`, fontSize: "16px" }}
          >
            {progress}%
          </div>
        </div>
      )}
      {/* Trigger upload after file selection */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleUpload}
      />

      {fileUrl &&
        (type === "image" ? (
          <ImageKitImage
            alt="Uploaded Image"
            src={fileUrl}
            width={500}
            height={300}
          />
        ) : type === "video" ? (
          <Video
            alt="Uploaded Video"
            src={fileUrl}
            controls
            className="h-96 w-full rounded-xl"
          />
        ) : null)}
    </ImageKitProvider>
  );
};

export default FileUpload;
