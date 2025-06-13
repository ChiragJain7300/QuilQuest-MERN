import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <section className="w-full bg-white rounded-md p-5">
      <div>
        <h1>All Books</h1>

        <Link href="/admin/books/new">
          <Button className="mt-3 bg-primary-admin hover:bg-dark-200 duration-150 px-5">
            + Create a New Book
          </Button>
        </Link>
      </div>

      <div>
        <p>Table</p>
      </div>
    </section>
  );
};

export default Page;
