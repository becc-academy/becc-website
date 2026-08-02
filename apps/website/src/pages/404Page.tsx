import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage = (): JSX.Element => {
  return (
    <main className="relative flex h-screen h-dvh items-center justify-center overflow-hidden bg-white px-5 py-6">
      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <div className="relative mb-5 flex h-64 w-full items-center justify-center sm:h-72">
          <span
            aria-hidden="true"
            className="absolute text-[10rem] font-black leading-none tracking-[-0.08em] text-[#f3f3f3] sm:text-[13rem]"
          >
            404
          </span>

          <svg
            aria-hidden="true"
            viewBox="0 0 220 220"
            className="relative h-52 w-52 sm:h-60 sm:w-60"
            fill="none"
          >
            <path
              d="M58 93 110 68l52 25-52 26-52-26Z"
              fill="#6a3136"
              stroke="#1d1d1d"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path
              d="M58 93v61l52 27v-62L58 93Z"
              fill="white"
              stroke="#1d1d1d"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path
              d="M162 93v61l-52 27v-62l52-26Z"
              fill="#fff7f3"
              stroke="#1d1d1d"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path
              d="m78 55-4-35 31-3 4 35-31 3Z"
              fill="white"
              stroke="#1d1d1d"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path d="m75 34 33 14M91 19c1 13-2 17-15 19" stroke="#1d1d1d" strokeWidth="3" />
            <path
              d="m128 57 8-34 34 8-8 34-34-8Z"
              fill="#fff7f3"
              stroke="#1d1d1d"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path d="m133 49 31-16M130 58l34-18M139 60l27-14" stroke="#1d1d1d" strokeWidth="3" />
            <path
              d="m57 61 7-8m-9-4 9 12m54-49 2-8 3 7 7 2-7 3-2 8-3-7-7-2 7-3Z"
              stroke="#f04b00"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="115" cy="47" r="3" fill="#f04b00" />
          </svg>
        </div>

        <span className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-becc-accent">
          Error 404
        </span>
        <h1 className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--heading-color)' }}>
          Oops... wrong classroom!
        </h1>
        <p className="mt-4 max-w-md text-base leading-7 text-black/55">
          The page you were looking for has moved, changed, or never made it onto the lesson plan.
        </p>
        <Link
          to="/"
          className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-becc-accent px-7 text-sm font-bold text-white transition-colors hover:bg-[#d9430a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-becc-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Go home
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
