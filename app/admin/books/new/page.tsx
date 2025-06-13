import BookForm from "@/components/admin/forms/BookForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NewBookPage = () => {
  return (
    <>
      <Link href="/admin/books">
        <Button className="bg-white text-black shadow-lg hover:bg-light-300 duration-150 px-5 mb-5">
          Go Back
        </Button>
      </Link>

      <section>
        <BookForm />
      </section>
    </>
  );
};

export default NewBookPage;
