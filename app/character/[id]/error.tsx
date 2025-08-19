"use client";

import { useEffect } from "react";

type Props = {
  error: Error;
  reset: () => void;
};

const ErrorPage = ({ error, reset }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center py-10">
      <h1 className="text-2xl font-bold">Oops! Something went wrong.</h1>
      <p className="mt-2 text-gray-500">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorPage;
