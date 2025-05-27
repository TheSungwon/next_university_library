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
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>

        <div className="book-info">
          <p>
            저자 :{" "}
            <span className="font-semibold text-light-200">{author}</span>
          </p>

          <p>
            카테고리 :{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>

          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>

          <div className="book-copies">
            <p>
              총 <span>{totalCopies} </span>권
            </p>
            <p>
              대출 가능 <span>{availableCopies} </span>권
            </p>
          </div>
          <p className="book-description">{description}</p>
          <Button className="book-overview_btn bg-red-500 text-black cursor-pointer w-full  ">
            <Image src="/icons/book.svg" alt="book" width={22} height={22} />
            <p className="font-semibold text-xl">빌리기</p>
          </Button>
        </div>

        <div className="relative flex flex-1 justify-center">
          <div className="relative">
            <BookCover
              variant="wide"
              className="z-10"
              coverColor={coverColor}
              coverUrl={coverUrl}
            />

            <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
              <BookCover variant="wide" coverColor={coverColor} coverUrl={coverUrl} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
