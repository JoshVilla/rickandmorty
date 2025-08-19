"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const goBack = () => {
    router.replace("/");
  };
  return (
    <div className="text-center py-10">
      <h1 className="text-2xl font-bold">404 — Page Not Found</h1>
      <p className="mt-2 text-gray-500">
        The page you are looking for does not exist.
      </p>
      <button
        onClick={goBack}
        className="mt-10 bg-blue-700 px-4 py-1 rounded-lg cursor-pointer hover:bg-blue-800 transition "
      >
        Got to homepage
      </button>
    </div>
  );
}
