import { Session } from "next-auth";
import React from "react";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="">
      <div className="mb-5">
        <h1 className="text-primary-admin text-2xl">Welcome, {session?.user?.name}</h1>
        <p className="text-light-500 text-sm">Monitor all of your users and books here</p>
      </div>
    </header>
  );
};

export default Header;
