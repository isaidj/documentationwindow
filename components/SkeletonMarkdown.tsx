import React from "react";

export const SkeletonMarkdown: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className={`animate-pulse bg-gray-100 h-4 w-${
            index % 2 ? "3/4" : "1/2"
          } mb-2`}
        ></div>
      ))}
    </div>
  );
};
