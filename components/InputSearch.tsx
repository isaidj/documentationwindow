import React from "react";
import {
  Search,
  Delete,
  TextSearch,
  BookText,
  SlidersHorizontal,
  LayoutGrid,
  Menu,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { Button } from "@/components/ui/Button";

export type SearchModeType = "onText" | "onDocuments";

interface InputSearchProps {
  searchMode: SearchModeType;
  textSearchTerm: string;
  docSearchTerm: string;
  isExpanded: boolean;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchModeChange: (mode: SearchModeType) => void;
  onReset: () => void;
}

const InputSearch: React.FC<InputSearchProps> = ({
  searchMode,
  textSearchTerm,
  docSearchTerm,
  isExpanded,
  onSearchChange,
  onSearchModeChange,
  onReset,
}) => {
  return (
    <div
      className={`flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md `}
    >
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="w-full pl-10 py-2 rounded-md border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder={
            searchMode === "onText"
              ? "Buscar en el texto"
              : "Buscar en la documentación"
          }
          type="text"
          value={searchMode === "onText" ? textSearchTerm : docSearchTerm}
          onChange={onSearchChange}
        />
        {(textSearchTerm.length > 0 || docSearchTerm.length > 0) && (
          <Delete
            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            size={16}
            onClick={onReset}
          />
        )}
      </div>
      <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-md">
        <TextSearch
          className={`h-4 w-4 ${
            searchMode === "onText" ? "text-indigo-600" : "text-gray-400"
          }`}
        />
        <Switch
          checked={searchMode === "onDocuments"}
          onCheckedChange={() =>
            onSearchModeChange(
              searchMode === "onText" ? "onDocuments" : "onText"
            )
          }
          className="data-[state=checked]:bg-indigo-600"
        />
        <BookText
          className={`h-4 w-4 ${
            searchMode === "onDocuments" ? "text-indigo-600" : "text-gray-400"
          }`}
        />
      </div>
      <Button
        variant="outline"
        size="icon"
        className="text-gray-600 hover:text-indigo-600 hover:border-indigo-300"
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span className="sr-only">Filtrar</span>
      </Button>
      {/* <Button
        variant="outline"
        size="icon"
        className="text-gray-600 hover:text-indigo-600 hover:border-indigo-300"
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="sr-only">Vista de cuadrícula</span>
      </Button> */}
      {/* <Button
        variant="outline"
        size="icon"
        className="text-gray-600 hover:text-indigo-600 hover:border-indigo-300"
      >
        <Menu className="h-4 w-4" />
        <span className="sr-only">Vista de lista</span>
      </Button> */}
    </div>
  );
};

export default InputSearch;
