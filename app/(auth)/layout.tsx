import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) redirect("/");
  return (
    <main className="auth-container bg-pattern bg-cover bg-top">
      {/* Form  */}
      <div className="w-full md:w-1/2 px-4 min-h-screen flex items-start justify-center md:py-12 pt-[250px] pb-[50px]">
        <div className="auth-box">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/logo.svg"
              alt="book-2.svg"
              width={44}
              height={44}
            />
            <span className="ms-2 text-3xl text-white">QuillQuest</span>
          </div>

          {children}
        </div>
      </div>

      {/* Image */}
      <div className="w-full md:w-1/2 md:h-screen h-[200px] absolute md:fixed right-0 top-0 ">
        <Image
          src="/images/auth-illustration.png"
          alt="Auth Illustration"
          className="w-full h-full object-cover"
          fill
        />
      </div>
    </main>
  );
};

export default layout;
