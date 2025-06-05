import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import BookCover from "./BookCover";

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
}: Book) => {
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

        <Button className="book-overview_btn bg-[#EED1AC] flex items-center hover:bg-[#EED1AC]/80">
          <Image src="/icons/book.svg" alt="book.svg" width={24} height={24} />
          <p className="font-bebas-neue text-2xl tracking-wider font-semibold text-dark-100">
            Borrow
          </p>
        </Button>
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
