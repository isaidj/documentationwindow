"use client";
import React, { useState, useEffect, useCallback } from "react";

import { X, Search, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { SkeletonMarkdown } from "./SkeletonMarkdown";
import MarkdownVisualizer from "./MarkdownVisualizer";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { useDocumentationDrawer } from "@/context/DocumentationDrawerContext";
import MenuDrawer from "./MenuDrawer";

const DocumentationDrawer: React.FC = () => {
  const { isOpen, setIsOpen, pathname } = useDocumentationDrawer();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermDebounced] = useDebounce(searchTerm, 500);
  const [documentationContent, setDocumentationContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuWidth = 256;
  const drawerWidth = 384;

  const toggleDrawer = useCallback(() => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    window.parent.postMessage({ type: "drawerToggle", isOpen: newIsOpen }, "*");
  }, [isOpen, setIsOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "toggleDrawer") {
        setIsOpen(event.data.isOpen);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setIsOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F1") {
        event.preventDefault();
        toggleDrawer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleDrawer]);

  useEffect(() => {
    if (isOpen) {
      if (!pathname) {
        setDocumentationContent("## No se ha seleccionado documentación");
        return;
      }
      fetchOutlineDocumentation();
    }
  }, [pathname, isOpen, searchTermDebounced]);

  const fetchOutlineDocumentation = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/documentation/search-documents",
        {
          body: {
            searchTerm: searchTermDebounced,
            pathname,
          },
        }
      );

      if (response.data.error) {
        setDocumentationContent("## No se encontró documentación");
      } else {
        setDocumentationContent(response.data.data);
      }
    } catch (error) {
      console.error("Error loading documentation:", error);
      setDocumentationContent("## Error al cargar la documentación");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 top-0 right-0 h-full bg-white shadow-lg flex transition-all duration-75 ease-in-out overflow-hidden ${
        isOpen ? "fade-in" : "fade-out"
      }`}
      style={{ width: `${drawerWidth}px` }}
    >
      <MenuDrawer
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        menuWidth={menuWidth}
      />
      <div
        className="flex flex-col h-full transition-transform duration-75 ease-in-out relative"
        style={{
          width: `${drawerWidth}px`,
          // transform: isMenuOpen
          //   ? `translateX(${menuWidth}px)`
          //   : "translateX(0)",
        }}
      >
        <div className="flex justify-between items-center gap-1 p-4 bg-blue-600 text-white">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-blue-200 transition-colors"
          >
            {isMenuOpen ? (
              <PanelLeftClose size={24} className="cursor-pointer" />
            ) : (
              <PanelLeftOpen size={24} className="cursor-pointer" />
            )}
          </button>
          <h2 className="text-lg font-semibold">Documentación</h2>
          <div className="w-6"></div>{" "}
          {/* Espaciador para mantener el título centrado */}
        </div>

        {/* Botón de cierre reposicionado */}
        <button
          onClick={toggleDrawer}
          className="absolute top-2 right-2 text-white hover:text-blue-200 transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="flex-grow flex flex-col overflow-hidden">
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar en la documentación..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                className="absolute left-3 top-2.5 text-blue-400"
                size={16}
              />
            </div>
          </div>
          <div className="flex-grow p-4 overflow-auto">
            {loading ? (
              <SkeletonMarkdown />
            ) : (
              <MarkdownVisualizer
                content={documentationContent}
                search={searchTermDebounced}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationDrawer;
