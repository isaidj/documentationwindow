import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  PanelLeftOpen,
  PanelLeftClose,
  Expand,
  Minimize2,
  Moon,
  User,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  Menu,
  Delete,
  TextSearch,
  BookText,
  Maximize2,
} from "lucide-react";
import { useDocumentationDrawer } from "@/context/DocumentationDrawerContext";
import { useDocumentationDrawerControls } from "@/hooks/useDocumentationDrawerControls";
import { useDebounce } from "use-debounce";
import InputSearch, { SearchModeType } from "@/components/InputSearch";
import axios from "axios";
import MenuDrawer from "@/components/MenuDrawer";
import FloatingSearchResults from "@/components/FloatingResults";
import { SkeletonMarkdown } from "@/components/skeletons/SkeletonMarkdown";
import MarkdownVisualizer from "@/components/MarkdownVisualizer";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";

const DocumentationDrawer = () => {
  const { pathname, setIsOpen: setIsOpenContext } = useDocumentationDrawer();
  const {
    isOpen,
    isExpanded,
    isMenuOpen,
    toggleDrawer,
    toggleExpand,
    toggleMenu,
  } = useDocumentationDrawerControls({
    initialIsOpen: false,
    initialIsExpanded: false,
    onToggleDrawer: setIsOpenContext,
  });

  const [textSearchTerm, setTextSearchTerm] = useState("");
  const [docSearchTerm, setDocSearchTerm] = useState("");
  const [debouncedTextSearchTerm] = useDebounce(textSearchTerm, 500);
  const [debouncedDocSearchTerm] = useDebounce(docSearchTerm, 500);
  const [searchMode, setSearchMode] = useState("onText");
  const [documentationContent, setDocumentationContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const menuWidth = 256;
  const drawerWidth = 600;

  useEffect(() => {
    if (isOpen && !documentationContent) {
      fetchDocumentContentCurrentPage(pathname);
    }
  }, [isOpen, pathname, documentationContent]);

  useEffect(() => {
    if (searchMode === "onDocuments" && debouncedDocSearchTerm) {
      searchDocuments(debouncedDocSearchTerm);
    }
  }, [debouncedDocSearchTerm, searchMode]);

  const fetchDocumentContentCurrentPage = async (url: string) => {
    setLoading(true);
    try {
      const mockResponse = await axios.post(
        "/api/documentation/documents-keys",
        { url }
      );
      const documentData = mockResponse.data[0];
      if (!documentData || !documentData.idDocument) {
        throw new Error("No se encontró el ID del documento");
      }
      const response = await axios.post("/api/documentation/export-document", {
        id: documentData.idDocument,
      });
      setDocumentationContent(response.data.data);
    } catch (error) {
      console.error("Error loading documentation:", error);
      setDocumentationContent("## No existe documentación para esta página");
    } finally {
      setLoading(false);
    }
  };

  const fetchDocumentContentGetOutline = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/documentation/export-document", {
        id: id,
      });
      setDocumentationContent(response.data.data);
    } catch (error) {
      console.error("Error loading documentation:", error);
      setDocumentationContent("## Error al cargar la documentación");
    } finally {
      setLoading(false);
    }
  };

  const searchDocuments = async (query: string) => {
    setLoadingSearch(true);
    try {
      const response = await axios.post("/api/documentation/search-documents", {
        body: { query },
      });
      setSearchResults(response.data.data || []);
    } catch (error) {
      console.error("Error searching documents:", error);
      setSearchResults([]);
    } finally {
      setLoadingSearch(false);
      setHasSearched(true);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (searchMode === "onText") {
      setTextSearchTerm(value);
    } else {
      setDocSearchTerm(value);
    }
  };

  const handleSearchModeChange = (mode: SearchModeType) => {
    setSearchMode(mode);
    setHasSearched(false);
    if (mode === "onDocuments") {
      setDocSearchTerm(textSearchTerm);
    } else {
      setTextSearchTerm(docSearchTerm);
    }
  };

  const handleResultClick = (documentId: string) => {
    setTextSearchTerm(docSearchTerm);
    fetchDocumentContentGetOutline(documentId);
    setSearchMode("onText");
  };

  const handleReset = () => {
    setTextSearchTerm("");
    setDocSearchTerm("");
    fetchDocumentContentCurrentPage(pathname);
  };

  const handleMenuItemClick = useCallback(
    (documentId: string) => {
      fetchDocumentContentGetOutline(documentId);
      toggleMenu();
    },
    [fetchDocumentContentGetOutline, toggleMenu]
  );

  if (!isOpen) return null;

  return (
    <div
      className={`absolute z-40 top-0 right-0 h-full bg-white shadow-lg flex transition-all duration-75 ease-in-out overflow-hidden ${
        isOpen ? "fade-in" : "fade-out"
      }`}
      style={{ width: isExpanded ? "100%" : `${drawerWidth}px` }}
    >
      <MenuDrawer
        isOpen={isMenuOpen}
        setIsOpen={toggleMenu}
        menuWidth={menuWidth}
        onItemClick={handleMenuItemClick}
      />
      <div
        className="flex flex-col h-full transition-transform duration-75 ease-in-out relative"
        style={{ width: isExpanded ? "100%" : `${drawerWidth}px` }}
      >
        <header className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                onClick={toggleMenu}
              >
                {isMenuOpen ? (
                  <PanelLeftClose className="h-5 w-5" />
                ) : (
                  <PanelLeftOpen className="h-5 w-5" />
                )}
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">
                Documentación
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                onClick={toggleExpand}
              >
                {isExpanded ? (
                  <Minimize2 className="h-5 w-5" />
                ) : (
                  <Maximize2 className="h-5 w-5" />
                )}
              </Button>
              {/* <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
              >
                <Moon className="h-5 w-5" />
                <span className="sr-only">Modo oscuro</span>
              </Button> */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                  >
                    <User className="h-5 w-5" />
                    <span className="sr-only">Menú de usuario</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Configuración</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                onClick={toggleDrawer}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Cerrar</span>
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-grow flex flex-col overflow-hidden relative">
          <div className="p-4 relative">
            <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  className="w-full pl-10  py-2 rounded-md border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder={
                    searchMode === "onText"
                      ? "Buscar en el texto"
                      : "Buscar en la documentación"
                  }
                  type="text"
                  value={
                    searchMode === "onText" ? textSearchTerm : docSearchTerm
                  }
                  onChange={handleSearch}
                />
                {(textSearchTerm.length > 0 || docSearchTerm.length > 0) && (
                  <Delete
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                    size={16}
                    onClick={handleReset}
                  />
                )}
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-md">
                <TextSearch
                  className={`h-4 w-4 ${
                    searchMode === "onText"
                      ? "text-indigo-600"
                      : "text-gray-400"
                  }`}
                />
                <Switch
                  checked={searchMode === "onDocuments"}
                  onCheckedChange={() =>
                    handleSearchModeChange(
                      searchMode === "onText" ? "onDocuments" : "onText"
                    )
                  }
                  className="data-[state=checked]:bg-indigo-600"
                />
                <BookText
                  className={`h-4 w-4 ${
                    searchMode === "onDocuments"
                      ? "text-indigo-600"
                      : "text-gray-400"
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
              <Button
                variant="outline"
                size="icon"
                className="text-gray-600 hover:text-indigo-600 hover:border-indigo-300"
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="sr-only">Vista de cuadrícula</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="text-gray-600 hover:text-indigo-600 hover:border-indigo-300"
              >
                <Menu className="h-4 w-4" />
                <span className="sr-only">Vista de lista</span>
              </Button>
            </div>
            {searchMode === "onDocuments" && hasSearched && (
              <div className="px-2  ">
                <FloatingSearchResults
                  results={searchResults}
                  onResultClick={handleResultClick}
                  isLoading={loadingSearch}
                />
              </div>
            )}
          </div>
          {/* {searchMode === "onText" && ( */}
          <div className="flex-grow p-4 overflow-auto relative">
            {loading ? (
              <SkeletonMarkdown />
            ) : (
              <MarkdownVisualizer
                content={documentationContent}
                search={debouncedTextSearchTerm}
              />
            )}
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default DocumentationDrawer;
