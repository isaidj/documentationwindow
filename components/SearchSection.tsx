// SearchSection.tsx
import React from "react";
import InputSearch, { SearchModeType } from "./InputSearch";
import FloatingSearchResults from "./FloatingResults";

interface SearchSectionProps {
  searchTerm: string;
  searchMode: SearchModeType;
  hasSearched: boolean;
  searchResults: any[];
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchModeChange: (mode: SearchModeType) => void;
  handleResultClick: (documentId: string) => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  searchTerm,
  searchMode,
  hasSearched,
  searchResults,
  handleSearch,
  handleSearchModeChange,
  handleResultClick,
}) => (
  <div className="p-4 relative">
    <InputSearch
      handleSearch={handleSearch}
      searchTerm={searchTerm}
      searchMode={searchMode}
      setSearchMode={handleSearchModeChange}
    />
    {searchMode === "onDocuments" &&
      hasSearched &&
      searchResults.length > 0 && (
        <FloatingSearchResults
          results={searchResults}
          onResultClick={handleResultClick}
        />
      )}
  </div>
);
