"use client";
import config from "@/lib/config";
import {
  ImageKitProvider,
  Image as ImageKitImage,
  upload,
} from "@imagekit/next";
import React, { useRef, useState } from "react";
import Image from "next/image";

const {
  env: {
    imagekit: { urlEndpoint, publicKey },
  },
} = config;
const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      // If the server response is not successful, extract the error text for debugging.
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Failed to authenticate image upload: ${error.message}`);
  }
};
const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const [progress, setProgress] = useState(0);

  // Create a ref for the file input element to access its files easily
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUpload = async () => {
    // Access the file input element using the ref
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }
    const file = fileInput.files[0];
    setFile({ filepath: file.name });

    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
      const uploadResponse = await upload({
        // Authentication parameters
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name, // Optionally set a custom file name
        /*
        // Progress callback to update upload progress state
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        // Abort signal to allow cancellation of the upload if needed.
        abortSignal: abortController.signal,
        */
      });
      console.log("Upload response:", uploadResponse);
      console.log(file);

      if (uploadResponse.url) {
        onFileChange(uploadResponse.url);
      }
      // Call the onFileChange prop with the uploaded file URL
    } catch (error) {
      // Handle specific error types provided by the ImageKit SDK.
      console.error("Upload error:", error);
    }
  };
  const [file, setFile] = useState<{ filepath: string } | null>(null);
  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      {/* File input element using React ref */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleUpload}
      />
      {/* Button to trigger the upload process */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          // Trigger the file input click event to open the file picker
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

        {file && <p className="upload-filename">{file.filepath}</p>}
      </button>

      {file && (
        <ImageKitImage
          alt={file.filepath}
          src={file.filepath}
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
