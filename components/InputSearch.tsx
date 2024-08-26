import React from "react";
import { BookText, Delete, Search, TextSearch } from "lucide-react";

export type SearchModeType = "onText" | "onDocuments";

interface InputSearchProps {
  searchTerm: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchMode: SearchModeType;
  setSearchMode: (mode: SearchModeType) => void;
  onReset: () => void;
}

const InputSearch: React.FC<InputSearchProps> = ({
  searchTerm,
  handleSearch,
  searchMode,
  setSearchMode,
  onReset,
}) => {
  const toggleSearchMode = () => {
    setSearchMode(searchMode === "onText" ? "onDocuments" : "onText");
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={
          searchMode == "onText"
            ? "Buscar en el texto"
            : "Buscar en la documentacion..."
        }
        value={searchTerm}
        onChange={handleSearch}
        className="w-full pl-10 pr-24 py-2 border border-blue-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Search className="absolute left-3 top-2.5 text-blue-400" size={16} />
      {searchTerm.length > 0 && (
        <Delete
          className="absolute right-20 top-2.5 text-blue-400 cursor-pointer"
          size={16}
          color="red"
          onClick={onReset}
        />
      )}
      <div
        className="absolute right-1 top-1.5 flex items-center bg-gray-200 rounded-full p-0.5 cursor-pointer"
        onClick={toggleSearchMode}
      >
        <div
          className={`flex items-center justify-center w-8 h-6 rounded-full transition-all duration-300 ${
            searchMode === "onText" ? "bg-white shadow-sm" : ""
          }`}
        >
          <TextSearch className="text-blue-400" size={14} />
        </div>
        <div
          className={`flex items-center justify-center w-8 h-6 rounded-full transition-all duration-300 ${
            searchMode === "onDocuments" ? "bg-white shadow-sm" : ""
          }`}
        >
          <BookText className="text-blue-400" size={14} />
        </div>
      </div>
    </div>
  );
};

export default InputSearch;
