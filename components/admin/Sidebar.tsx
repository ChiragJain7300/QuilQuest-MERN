"use client";
import { adminSideBarLinks } from "@/constants";
import { cn, getInitials } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";

const Sidebar = ({ session }: { session: any }) => {
  const pathName = usePathname();
  return (
    <aside className="bg-white md:w-64 w-24 min-h-screen h-full py-7 px-3 flex flex-col sticky top-0">
      {/* logo */}
      <div className="flex items-center justify-center md:justify-start md:px-3 mb-10 pb-10 gap-2 border-b border-dark-200 border-dashed">
        <Image
          src="/icons/admin/logo.svg"
          alt="logo.svg"
          width={37}
          height={37}
        />
        <h1 className="hidden md:block font-bold text-primary-admin text-2xl">
          QuillQuest
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        {adminSideBarLinks.map((link, index) => {
          const isSelected = pathName === link.route;
          return (
            <Link
              href={link.route}
              className={cn(
                "hover:bg-gray-200 p-3 md:ps-5 flex justify-center md:justify-start items-center gap-2 md:gap-3 rounded-md transition-all duration-150 hover:shadow-md hover:shadow-gray-300",
                isSelected && "bg-primary-admin text-white shadow-lg"
              )}
              key={index}
            >
              <Image
                src={link.img}
                alt={link.text}
                width={20}
                height={20}
                className={`${
                  isSelected ? "brightness-0 invert" : ""
                } object-contain`}
              />
              <p className="hidden md:block font-semibold ">{link.text}</p>
            </Link>
          );
        })}
      </div>

      {/* Account info */}
      <div className="pt-5 mt-auto w-full flex gap-2 justify-center border-t border-dark-200 border-dashed">
        <Avatar>
          <AvatarFallback className="bg-amber-100 text-dark-200">
            {getInitials(session?.user?.name || "User")}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col max-md:hidden">
          <p className="text-sm text-dark-200">{session?.user?.name}</p>
          <p className="text-xs text-light-500">{session?.user?.email}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
