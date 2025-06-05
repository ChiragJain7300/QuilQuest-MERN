"use client";
import config from "@/lib/config";
import {
  ImageKitProvider,
  Image as ImageKitImage,
  upload,
} from "@imagekit/next";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";

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

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      });

      console.log("Upload response:", uploadResponse);
      if (uploadResponse.url) {
        setFileUrl(uploadResponse.url);
        onFileChange(uploadResponse.url);
        toast({
          title: "Upload Successful",
          description: `File "${file.name}" uploaded successfully.`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Upload Failed",
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
        className="upload-btn bg-dark-300 text-white"
      >
        <Image
          src="/icons/upload.svg"
          alt="Upload Icon"
          height={20}
          width={20}
        />
        <span className="font-bold">Upload a file</span>
      </button>

      {/* Trigger upload after file selection */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleUpload}
      />

      {fileUrl && (
        <ImageKitImage
          alt="Uploaded Image"
          src={fileUrl}
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
