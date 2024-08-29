import React from "react";
import { FileText } from "lucide-react";

const FloatingSearchResultsSkeleton = ({ count = 5 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-start p-3 rounded-md transition-colors duration-150"
        >
          <div className="flex items-start w-full">
            <div className="flex-shrink-0 mr-3">
              <FileText size={20} className="text-gray-300" />
            </div>
            <div className="flex-grow">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-5/6 mt-1 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FloatingSearchResultsSkeleton;
