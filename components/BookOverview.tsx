import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import BookCover from "./BookCover";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import BorrowBook from "./BorrowBook";
interface Props extends Book {
  userId: string;
}
const BookOverview = async ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  id,
  userId,
}: Props) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const borrowingEligibility = {
    isEligible: availableCopies > 0 && user?.status === "APPROVED",
    message:
      availableCopies <= 0
        ? "Book is not available"
        : "You are not eligible to borrow this book",
  };
  return (
    <section className="text-white/70 text-lg book-overview">
      {/* Book info */}
      <div className="flex flex-1 flex-col">
        <h1 className="text-5xl mb-5 text-white">{title}</h1>

        <div className="flex gap-5 mb-5">
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p>
            Category{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>
        </div>

        <p className="flex items-center gap-1 mb-5">
          <Image src={"/icons/star.svg"} alt="star" width={16} height={16} />
          {rating}
        </p>

        <div className="flex gap-5 mb-5 items-center">
          <p>
            Total Books{" "}
            <span className="font-semibold text-light-200 ms-1">
              {totalCopies}
            </span>
          </p>
          <p>
            Available Books{" "}
            <span className="font-semibold text-light-200 ms-1">
              {availableCopies}
            </span>
          </p>
        </div>

        <p className="mb-5">{description}</p>

        {user && (
          <BorrowBook
            bookId={id}
            userId={userId}
            borrowingEligibility={borrowingEligibility}
          />
        )}
      </div>

      {/* Book image */}
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverUrl={coverUrl}
          />

          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              coverColor={coverColor}
              coverUrl={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
