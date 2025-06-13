"use client";
import React from "react";
import config from "@/lib/config";
import { ImageKitProvider, Video } from "@imagekit/next";

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <ImageKitProvider urlEndpoint={config.env.imagekit.urlEndpoint}>
      <Video
        src={videoUrl}
        controls={true}
        className="w-full rounded-xl max-w-2xl mx-auto"
      />
    </ImageKitProvider>
  );
};
export default BookVideo;
