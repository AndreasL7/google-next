import React, { Suspense } from "react";
import Link from "next/link";
import WebSearchResults from "@/components/WebSearchResults";

interface SearchParamsProps {
  searchParams: Promise<{
    searchTerm: string;
    start: string;
  }>;
}

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  // Add additional properties based on your API response
}

const WebSearchPageContent = async ({ searchParams }: SearchParamsProps) => {
  const searchParamsAwaited = await searchParams;
  const startIndex = searchParamsAwaited.start || "1";

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${searchParamsAwaited.searchTerm}'}&start=${startIndex}`
  );

  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const data = await response.json();
  const results: SearchResult[] = data.items;

  if (!results) {
    return (
      <div className="flex flex-col justify-center items-center pt-10">
        <h1 className="text-3xl mb-4">
          No results found {searchParamsAwaited.searchTerm}
        </h1>
        <p className="text-lg">
          Try searching the web or images for something else{" "}
          <Link href="/" className="text-blue-500">
            Home
          </Link>
        </p>
      </div>
    );
  }

  return <div>{results && <WebSearchResults results={data} />}</div>;
};

const WebSearchPage = ({ searchParams }: SearchParamsProps) => {
  return (
    <Suspense>
      <WebSearchPageContent searchParams={searchParams} />
    </Suspense>
  );
};

export default WebSearchPage;
