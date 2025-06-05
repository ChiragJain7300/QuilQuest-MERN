"use client";
import { cn, getInitials } from "@/lib/utils";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { use } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  return (
    <div className="dark:text-white text-white w-full flex justify-between items-center py-4 gap-5">
      <div className="text-3xl flex items-center gap-3">
        <Image src={"/icons/logo.svg"} alt="main-logo" width={40} height={40} />
        <p>QuillQuest</p>
      </div>
      <ul className="flex gap-4 text-lg font-semibold tracking-wider items-center">
        <li>
          <Link
            href={"/"}
            className={cn(
              "",
              pathname === "/" ? "text-white/80 underline" : ""
            )}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href={"#"}
            className={cn(
              "",
              pathname === "/library" ? "text-white/80 underline" : ""
            )}
          >
            Library
          </Link>
        </li>
        <li>
          <Link
            href={"/my-profile"}
            className={cn(
              "",
              pathname === "/my-profile" ? "text-white/80 underline" : ""
            )}
          >
            <Avatar>
              <AvatarFallback className="bg-dark-400 text-light-200">
                {getInitials(session?.user?.name || "User")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
