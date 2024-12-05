import SearchHeader from "@/components/SearchHeader";
import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <SearchHeader />
      {children}
    </div>
  );
};

export default layout;
