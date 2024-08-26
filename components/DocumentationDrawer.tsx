// DocumentationDrawer.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDocumentationDrawer } from "@/context/DocumentationDrawerContext";

import { SearchModeType } from "./InputSearch";
import { useDocumentationService } from "@/hooks/useDocumentationService";
import { DrawerHeader } from "./DrawerHeader";
import { SearchSection } from "./SearchSection";
import { ContentSection } from "./ContentSection";

const DRAWER_WIDTH = 384;

const DocumentationDrawer: React.FC = () => {
  const { isOpen, setIsOpen, pathname } = useDocumentationDrawer();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchMode, setSearchMode] = useState<SearchModeType>("onText");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    loading,
    documentationContent,
    searchResults,
    hasSearched,
    fetchDocumentation,
    fetchAndSetDocumentContent,
  } = useDocumentationService();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "toggleDrawer") {
        setIsOpen(event.data.isOpen);
      }
      if (event.data?.type === "toggleExpand") {
        setIsExpanded(event.data.isOpen);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F1") {
        event.preventDefault();
        toggleDrawer();
      }
    };

    window.addEventListener("message", handleMessage);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen && !documentationContent) {
      fetchDocumentation(pathname);
    }
  }, [isOpen, pathname, documentationContent, fetchDocumentation]);

  const toggleDrawer = useCallback(() => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    window.parent.postMessage({ type: "drawerToggle", isOpen: newIsOpen }, "*");
  }, [isOpen, setIsOpen]);

  const toggleExpand = useCallback(() => {
    const newIsExpanded = !isExpanded;
    setIsExpanded(newIsExpanded);
    window.parent.postMessage(
      { type: "expandToggle", isOpen: newIsExpanded },
      "*"
    );
  }, [isExpanded]);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchTerm(value);
      if (searchMode === "onDocuments" && value) {
        fetchDocumentation(value);
      }
    },
    [searchMode, fetchDocumentation]
  );

  const handleSearchModeChange = useCallback(
    (mode: SearchModeType) => {
      setSearchMode(mode);
      if (mode === "onDocuments" && searchTerm) {
        fetchDocumentation(searchTerm);
      }
    },
    [searchTerm, fetchDocumentation]
  );

  const handleResultClick = useCallback(
    (documentId: string) => {
      fetchAndSetDocumentContent(documentId);
      setSearchMode("onText");
    },
    [fetchAndSetDocumentContent]
  );

  if (!isOpen) return null;

  return (
    <div
      className={`absolute z-40 top-0 right-0 h-full bg-white shadow-lg flex transition-all duration-75 ease-in-out overflow-hidden ${
        isOpen ? "fade-in" : "fade-out"
      }`}
      style={{ width: isExpanded ? "100%" : `${DRAWER_WIDTH}px` }}
    >
      <div className="flex flex-col h-full w-full">
        <DrawerHeader
          isExpanded={isExpanded}
          toggleDrawer={toggleDrawer}
          toggleExpand={toggleExpand}
        />
        <div className="flex-grow flex flex-col overflow-hidden relative">
          <SearchSection
            searchTerm={searchTerm}
            searchMode={searchMode}
            hasSearched={hasSearched}
            searchResults={searchResults}
            handleSearch={handleSearch}
            handleSearchModeChange={handleSearchModeChange}
            handleResultClick={handleResultClick}
          />
          <ContentSection
            searchMode={searchMode}
            loading={loading}
            documentationContent={documentationContent}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(DocumentationDrawer);
