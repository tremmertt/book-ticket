import React from "react";

export default function Film(props) {
  const { film } = props;

  return (
    <div>
      <div className="  mr-2 h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
        <div
          syle={{
            background: `url(${film.image}),url(https://picsum.photos/300)`,
            backgroundPosition: "center",
            backgroundSize: "100%",
          }}
        >
          <img
            src={film.image}
            alt={film.nameFilm}
            className="opacity-0 w-full"
            style={{ height: "300px" }}
          />
        </div>
        <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3 h-16">
          {film.nameFilm}
        </h1>
        <p className="leading-relaxed mb-3 h-16">
          {film.descripte.length > 100 ? (
            <span>{film.descripte.slice(0, 100)}...</span>
          ) : (
            <span>{film.descripte}</span>
          )}
        </p>
        <a className="text-indigo-500 inline-flex items-center">
          BOOK TICKET
          <svg
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
