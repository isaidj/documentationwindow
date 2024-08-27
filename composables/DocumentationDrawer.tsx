import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  PanelLeftOpen,
  PanelLeftClose,
  Expand,
  Minimize2,
} from "lucide-react";
import { useDocumentationDrawer } from "@/context/DocumentationDrawerContext";
import { useDocumentationDrawerControls } from "@/hooks/useDocumentationDrawerControls";
import { useDebounce } from "use-debounce";
import InputSearch, { SearchModeType } from "@/components/InputSearch";
import axios from "axios";
import MenuDrawer from "@/components/MenuDrawer";
import FloatingSearchResults from "@/components/FloatingResults";
import { SkeletonMarkdown } from "@/components/SkeletonMarkdown";
import MarkdownVisualizer from "@/components/MarkdownVisualizer";
import Breadcrumbs from "@/components/Breadcrumbs";

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
  const [searchMode, setSearchMode] = useState<SearchModeType>("onText");
  const [documentationContent, setDocumentationContent] = useState("");
  const [loading, setLoading] = useState(false);
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
        {
          url: url,
        }
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
    setLoading(true);
    try {
      const response = await axios.post("/api/documentation/search-documents", {
        body: {
          query,
        },
      });
      setSearchResults(response.data.data || []);
    } catch (error) {
      console.error("Error searching documents:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
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
    [fetchDocumentContentGetOutline]
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
        <div className="flex justify-between items-center gap-1 p-4 bg-blue-600 text-white">
          <div className="flex gap-2">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-200 transition-colors"
            >
              {isMenuOpen ? (
                <PanelLeftClose size={24} />
              ) : (
                <PanelLeftOpen size={24} />
              )}
            </button>
            <button onClick={toggleExpand}>
              {isExpanded ? <Minimize2 size={24} /> : <Expand size={24} />}
            </button>
          </div>
          <h2 className="text-lg font-semibold">Documentación</h2>
          <button
            onClick={toggleDrawer}
            className="text-white hover:text-blue-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow flex flex-col overflow-hidden relative">
          <div className="p-4 relative">
            <InputSearch
              handleSearch={handleSearch}
              searchTerm={
                searchMode === "onText" ? textSearchTerm : docSearchTerm
              }
              searchMode={searchMode}
              setSearchMode={handleSearchModeChange}
              onReset={handleReset}
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
          {searchMode === "onText" && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentationDrawer;
