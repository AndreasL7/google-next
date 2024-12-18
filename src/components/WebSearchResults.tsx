import React, { Suspense } from "react";
import Link from "next/link";
import Parser from "html-react-parser";
import PaginationButtons from "./PaginationButtons";

interface ResultsPropsItem {
  link: string;
  formattedUrl: string;
  title: string;
  htmlSnippet: string;
}

interface ResultsProps {
  results: {
    searchInformation: {
      formattedTotalResults: string;
      formattedSearchTime: string;
    };
    items: ResultsPropsItem[];
  };
}

const WebSearchResults = ({ results }: ResultsProps) => {
  return (
    <div className="w-full mx-auto px-3 pb-40 sm:pb-24 sm:pl-[5%] md:pl-[14%] lg:pl-52">
      <p className="text-gray-600 text-sm mb-5 mt-3">
        About {results.searchInformation?.formattedTotalResults} results (
        {results.searchInformation?.formattedSearchTime} seconds)
      </p>
      {results.items?.map((result) => (
        <div key={result.link} className="mb-8 max-w-xl">
          <div className="group flex flex-col">
            <Link href={result.link}>{result.formattedUrl}</Link>
            <Link
              href={result.link}
              className="group-hover:underline decoration-blue-800 text-xl truncate font-medium text-blue-800"
            >
              {result.title}
            </Link>
          </div>
          <p className="text-gray-600">{Parser(result.htmlSnippet)}</p>
        </div>
      ))}
      <Suspense>
        <PaginationButtons />
      </Suspense>
    </div>
  );
};

export default WebSearchResults;
