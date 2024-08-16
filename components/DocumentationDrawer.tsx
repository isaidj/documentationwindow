"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  X,
  Search,
  MinimizeIcon,
  MaximizeIcon,
  Library,
  PanelLeft,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";
import { useResizable } from "../hooks/useResizable";
import { Resizer } from "./Resizer";
import { SkeletonMarkdown } from "./SkeletonMarkdown";
import MarkdownVisualizer from "./MarkdownVisualizer";
import axios from "axios";
import path from "path";
import MenuDrawer from "./MenuDrawer";
import { useDebounce } from "use-debounce";

const DocumentationDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermDebounced] = useDebounce(searchTerm, 500);
  const [documentationContent, setDocumentationContent] = useState("");
  const [loading, setLoading] = useState(false);
  let pathname = usePathname();
  pathname = path.basename(pathname);

  const menuWidth = 256;

  const {
    totalWidth,
    width,
    isResizing,
    isMenuOpen,
    handleMouseDown,
    toggleMenu,
  } = useResizable({
    minWidth: 300,
    maxWidthPercentage: 0.8,
    defaultWidth: 384,
    menuWidth,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F1") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
        if (!isOpen) {
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      fetchOutlineDocumentation().then((data) => {
        setDocumentationContent(data.data);
      });
    }
  }, [pathname, isOpen]);

  const fetchOutlineDocumentation = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/documentation/search-documents",
        {
          body: {
            searchTerm,
            pathname,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error loading documentation:", error);
      return { error: "Error loading documentation" };
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // Implement local search if desired
  };

  return (
    <div
      className={`fixed z-50 top-0 right-0 h-full bg-white  ${
        isOpen ? "translate-x-0" : "translate-x-full shadow-2xl"
      }`}
      style={{
        width: `${totalWidth}px`,
        transition: isResizing
          ? "none"
          : "transform 0.3s ease-in-out, width 0.3s ease-in-out",
      }}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="absolute z-50 -left-9 top-1/3 w-9 h-auto p-1 bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-lg rounded-tr-none rounded-br-none shadow-2xl"
      >
        <Library size={30} />
      </button>

      <Resizer onMouseDown={handleMouseDown} isOpen={isOpen} />

      <div className="flex flex-row h-full relative">
        <MenuDrawer
          isOpen={isMenuOpen}
          setIsOpen={toggleMenu}
          menuWidth={menuWidth}
        />

        <div
          className="flex flex-col h-full z-40 shadow-2xl flex-grow min-w-72"
          style={{
            width: `${width}px`,
            transition: isResizing ? "none" : "width 0.3s ease-in-out",
          }}
        >
          <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
            {isMenuOpen ? (
              <PanelLeftClose
                size={24}
                onClick={toggleMenu}
                className="cursor-pointer"
              />
            ) : (
              <PanelLeftOpen
                size={24}
                onClick={toggleMenu}
                className="cursor-pointer"
              />
            )}

            <h2 className="text-lg font-semibold">Documentación</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-blue-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

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
              {isResizing || loading ? (
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
    </div>
  );
};

export default DocumentationDrawer;
