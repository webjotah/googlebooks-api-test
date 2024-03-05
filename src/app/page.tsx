'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BookScheema } from '../types/books';

interface FetchDataProps {
  searchParams: {
    query: string;
    pagination: number;
  };
}

const fetchData = async ({ searchParams }: FetchDataProps) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchParams.query}&projection=lite&startIndex=${searchParams.pagination}&maxResults=16&key=AIzaSyC7kR7IsNX_kqyL44et6Mg2BOUl9BM8qDI`
    );
    const data = await response.json();

    return data.items;
  } catch (error) {
    console.error(error);
  }
};

export default function Home() {
  const [books, setBooks] = useState<BookScheema[]>([]);
  const [searchParams, setSearchParams] = useState({
    query: 'react js',
    pagination: 0,
  });

  useEffect(() => {
    fetchData({ searchParams }).then((data) => {
      setBooks(data);
    });
  }, [searchParams]);

  function searchAction(event: any) {
    event.preventDefault();
    let input = event.target.form[0] as HTMLInputElement;

    setSearchParams({ pagination: 0, query: input?.value });
  }

  function paginationActionNext(event: any) {
    event.preventDefault();

    setSearchParams({
      ...searchParams,
      pagination: searchParams.pagination + 15,
    });
  }

  function paginationActionPrev(event: any) {
    event.preventDefault();

    if (searchParams.pagination >= 0 && searchParams.pagination < 16) {
      setSearchParams({
        ...searchParams,
        pagination: 0,
      });
    } else {
      setSearchParams({
        ...searchParams,
        pagination: searchParams.pagination + 15,
      });
    }
  }

  console.log(books);

  return books !== undefined ? (
    <>
      <div className="">
        <h1 className="text-4xl text-center">Books</h1>
        <form className="flex flex-col my-5 items-center justify-center">
          <label htmlFor="search" className="text-lg font-bold">
            Search
          </label>
          <div className="w-full h-full flex items-center justify-center gap-4 flex-col">
            <div className="w-full h-full flex items-center justify-center gap-4">
              <input
                type="text"
                className="w-1/3 h-full p-1 px-2 focus:border-zinc-600 transition-all border border-slate-200 rounded-md text-zinc-300 font-semibold outline-none bg-transparent"
                name="search"
              />
              <button
                onClick={(event) => searchAction(event)}
                className="px-5 py-1 hover:bg-blue-700 rounded-lg text-white font-semibold cursor-pointer bg-blue-500 transition-all"
              >
                Search
              </button>
            </div>
            <div className="flex gap-4 flex-row-reverse">
              <button
                onClick={(event) => paginationActionNext(event)}
                className="px-5 py-1 hover:bg-blue-700 rounded-lg text-white font-semibold cursor-pointer bg-blue-500 transition-all"
              >
                Next
              </button>
              <button
                onClick={(event) => paginationActionPrev(event)}
                className="px-5 py-1 hover:bg-blue-700 rounded-lg text-white font-semibold cursor-pointer bg-blue-500 transition-all"
              >
                Prev
              </button>
            </div>
          </div>
        </form>
        <div className="flex flex-wrap justify-center">
          {books.map((book) => (
            <div
              className="m-2 border border-zinc-700 rounded-md"
              key={book.id}
            >
              <div className="max-w-xs rounded overflow-hidden shadow-lg">
                <Image
                  src={book?.volumeInfo?.imageLinks?.thumbnail}
                  alt={book.volumeInfo.title}
                  height={200}
                  width={150}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    {book.volumeInfo.title}
                  </div>
                  <p className="text-zinc-400 text-base">
                    {book.volumeInfo.authors}
                  </p>
                  <p className="text-zinc-400 text-base">
                    {book.volumeInfo.publisher}
                  </p>
                </div>
                <div className="px-6 py-4">
                  <a
                    href={book.volumeInfo.previewLink}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  ) : (
    <h1>Loading...</h1>
  );
}
