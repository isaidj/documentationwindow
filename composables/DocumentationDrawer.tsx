import React, { useState, useEffect, useCallback, useRef } from "react";
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
import MarkdownVisualizer, {
  MarkdownVisualizerProps,
} from "@/components/MarkdownVisualizer";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import DropdownMenu from "@/components/ui/DropdownMenu";
import { useQuery, gql } from "@apollo/client";
import {
  HelpsQuery,
  QueryHelpsArgs,
  StateHelp,
  useHelpsQuery,
} from "@/domain/graphql";
import AdminPanel from "./AdminPanel";
import { useAuth } from "@/context/AuthContext";

const DocumentationDrawer = () => {
  const { jwt, isLoggedIn } = useAuth();
  const { pathname, setIsOpen: setIsOpenContext } = useDocumentationDrawer();
  const [menuWidth, setMenuWidth] = useState(256);
  const [drawerWidth, setDrawerWidth] = useState(600);
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
    setDrawerWidth,
  });
  // useHelpsQuery();
  const [textSearchTerm, setTextSearchTerm] = useState("");
  const [docSearchTerm, setDocSearchTerm] = useState("");
  const [debouncedTextSearchTerm] = useDebounce(textSearchTerm, 500);
  const [debouncedDocSearchTerm] = useDebounce(docSearchTerm, 500);
  const [searchMode, setSearchMode] = useState<SearchModeType>("onText");
  const [adminMode, setAdminMode] = useState(false);
  const [documentationContent, setDocumentationContent] =
    useState<MarkdownVisualizerProps>();

  const [documentUrlID, setDocumentUrlID] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (isOpen && !documentationContent && jwt) {
      fetchDocumentContentCurrentPage(pathname);
    }
  }, [isOpen, pathname, documentationContent, jwt]);

  useEffect(() => {
    if (searchMode === "onDocuments" && debouncedDocSearchTerm) {
      searchDocuments(debouncedDocSearchTerm);
    }
  }, [debouncedDocSearchTerm, searchMode]);

  const fetchDocumentContentCurrentPage = async (url: string) => {
    setLoading(true);
    try {
      const args: QueryHelpsArgs = {
        where: {
          url: {
            _like: url,
          },
          state: StateHelp.Active,
        },
      };
      const HelpsResponse = await axios.post("/api/helpers", args, {
        method: "POST",
        headers: {
          Authorization: `${jwt}`,
        },
      });

      const HelpData: HelpsQuery = HelpsResponse.data;
      const documentData = HelpData.helps[0];

      if (!documentData) {
        throw new Error("No se encontró el ID del documento");
      }
      const response = await axios.post("/api/documentation/document-info", {
        id: documentData.outlineId,
      });
      const documentInfo: MarkdownVisualizerProps = response.data;
      setDocumentationContent(documentInfo);
      setDocumentUrlID(documentData.outlineId);
    } catch (error) {
      setDocumentationContent({
        markdown_text: "## No existe documentación para esta página",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchDocumentContentGetOutline = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/documentation/document-info", {
        id,
      });
      setDocumentationContent(response.data);
    } catch (error) {
      setDocumentationContent({
        markdown_text: "## No existe documentación para esta página",
      });
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
        currentDocumentId={documentationContent?.data?.id}
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
              <h1 className="text-2xl font-bold text-gray-800 flex gap-2">
                Documentación{" "}
                {adminMode ? (
                  <h1 className="text-indigo-600 font-medium">Administrador</h1>
                ) : null}
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

              <DropdownMenu
                trigger={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                  >
                    <User className="h-5 w-5" />
                    <span className="sr-only">Menú de usuario</span>
                  </Button>
                }
                contentSide="right"
                content={(closeMenu) => (
                  <>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Perfil
                    </a>

                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-indigo-600 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => {
                        closeMenu();
                        setAdminMode((prev) => !prev);
                      }}
                    >
                      {adminMode
                        ? "Salir del modo admin"
                        : "Entrar al modo admin"}
                    </a>
                  </>
                )}
              />
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
        {adminMode ? (
          <AdminPanel goBack={() => setAdminMode(false)} />
        ) : (
          <div className="flex-grow flex flex-col overflow-hidden relative ">
            <div
              className={`flex flex-col  $${isExpanded ? "md:w-96" : "w-full"}`}
            >
              <></>
              <div className="p-4 relative ">
                <InputSearch
                  searchMode={searchMode}
                  textSearchTerm={textSearchTerm}
                  docSearchTerm={docSearchTerm}
                  isExpanded={isExpanded}
                  onSearchChange={handleSearch}
                  onSearchModeChange={handleSearchModeChange}
                  onReset={handleReset}
                />
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
            </div>

            <div className="flex-grow p-4 overflow-auto relative">
              {loading ? (
                <SkeletonMarkdown />
              ) : (
                <MarkdownVisualizer
                  markdown_text={documentationContent?.markdown_text}
                  data={documentationContent?.data}
                  search={debouncedTextSearchTerm}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentationDrawer;
