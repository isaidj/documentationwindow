// ContentSection.tsx
import React from "react";
import { SkeletonMarkdown } from "./SkeletonMarkdown";
import MarkdownVisualizer from "./MarkdownVisualizer";
import { SearchModeType } from "./InputSearch";

interface ContentSectionProps {
  searchMode: SearchModeType;
  loading: boolean;
  documentationContent: string;
  searchTerm: string;
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  searchMode,
  loading,
  documentationContent,
  searchTerm,
}) =>
  searchMode === "onText" && (
    <div className="flex-grow p-4 overflow-auto relative">
      {loading ? (
        <SkeletonMarkdown />
      ) : (
        <MarkdownVisualizer
          content={documentationContent}
          search={searchMode === "onText" ? searchTerm : ""}
        />
      )}
    </div>
  );
