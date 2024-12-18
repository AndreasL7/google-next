"use client";

import React, { useEffect } from "react";

interface ErrorProps {
  error: Error;
}

const Error = ({ error }: ErrorProps) => {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <h1 className="text-3xl mb-4">Something went wrong!</h1>
      <button className="text-blue-500">Try again</button>
    </div>
  );
};

export default Error;
