"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { DocumentItem, ResponseData } from "@/types/InterfaceMenuStructure";
import { ChevronDown, FileText, Folder } from "lucide-react";
import { useDocumentationDrawer } from "@/context/DocumentationDrawerContext";
import * as Tooltip from "@radix-ui/react-tooltip";
import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/Button";

interface MenuDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  menuWidth: number;
  onItemClick: (documentId: string) => void;
}

const MenuItemComponent: React.FC<{
  item: DocumentItem;
  depth: number;
  onItemClick: (documentId: string) => void;
}> = React.memo(({ item, depth, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { pathname } = useDocumentationDrawer();
  const titleRef = useRef<HTMLSpanElement>(null);

  const handleItemClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onItemClick(item.id);
    },
    [item.id, onItemClick]
  );

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const checkTextOverflow = () => {
      if (titleRef.current) {
        setShowTooltip(
          titleRef.current.scrollWidth > titleRef.current.clientWidth
        );
      }
    };

    checkTextOverflow();
    window.addEventListener("resize", checkTextOverflow);

    return () => {
      window.removeEventListener("resize", checkTextOverflow);
    };
  }, [item.title]);

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex relative items-center justify-between p-2 cursor-pointer rounded-md transition-colors duration-200 ease-in-out",
          pathname === item.title
            ? "bg-primary/10 text-primary"
            : "hover:bg-gray-100 hover:text-indigo-600",
          depth === 0 && "font-medium"
        )}
        style={{ paddingLeft: `${(depth + 1) * 0.75}rem` }}
        onClick={handleItemClick}
      >
        <div className="flex items-center w-full min-w-0">
          <div className="w-5 flex-shrink-0 flex justify-center mr-2">
            {item.children.length > 0 ? (
              <Folder size={16} className="text-muted-foreground" />
            ) : (
              <FileText size={16} className="text-muted-foreground" />
            )}
          </div>
          <Tooltip.Provider delayDuration={300}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <span
                  ref={titleRef}
                  className={cn(
                    "text-sm truncate flex-grow mr-2",
                    pathname === item.title
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  )}
                >
                  {item.title}
                </span>
              </Tooltip.Trigger>
              {showTooltip && (
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-popover p-2 rounded-md shadow-md border text-popover-foreground z-50 max-w-xs"
                    side="right"
                    sideOffset={5}
                  >
                    {item.title}
                    <Tooltip.Arrow className="fill-popover" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              )}
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
        {item.children.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="w-6 h-6 p-0 hover:bg-transparent"
            onClick={handleToggle}
          >
            <ChevronDown
              size={16}
              className={cn(
                "text-muted-foreground transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </Button>
        )}
      </div>
      {item.children.length > 0 && (
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          )}
        >
          {item.children.map((child) => (
            <MenuItemComponent
              key={child.id}
              item={child}
              depth={depth + 1}
              onItemClick={onItemClick}
            />
          ))}
        </div>
      )}
    </div>
  );
});

MenuItemComponent.displayName = "MenuItemComponent";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="p-4">
      <div className="h-6 w-1/2 bg-gray-200 rounded mb-4"></div>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          {index % 2 === 0 && (
            <div className="pl-8">
              {[...Array(3)].map((_, subIndex) => (
                <div key={subIndex} className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-gray-200 rounded-full mr-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const MenuDrawer: React.FC<MenuDrawerProps> = React.memo(
  ({ isOpen, setIsOpen, menuWidth, onItemClick }) => {
    const [loading, setLoading] = useState(false);
    const [menuContent, setMenuContent] = useState<DocumentItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchMenu = useCallback(async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post<ResponseData>(
          "https://documentationwindow.vercel.app/api/documentation/collections-documents"
        );
        const data = response.data;
        if (Array.isArray(data.data)) {
          setMenuContent(data.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error loading menu:", error);
        setMenuContent([]);
        if (axios.isAxiosError(error)) {
          setError(`Failed to load menu: ${error.message}`);
        } else {
          setError("An unexpected error occurred while loading the menu");
        }
      } finally {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      if (isOpen && menuContent.length === 0 && !error) {
        fetchMenu();
      }
    }, [isOpen, menuContent, fetchMenu, error]);

    const handleRetry = () => {
      fetchMenu();
    };

    return (
      <div
        className={`relative z-30 h-full bg-white shadow-lg transition-all duration-300 ease-in-out overflow-y-auto`}
        style={{
          width: isOpen ? `${menuWidth}px` : "0",
          minWidth: isOpen ? `${menuWidth}px` : "0",
        }}
      >
        {loading ? (
          <SkeletonLoader />
        ) : error ? (
          <div className="p-4 flex flex-col justify-center items-center">
            <p className="text-red-500 mb-2">{error}</p>
            <Button
              onClick={handleRetry}
              variant="default"
              size="icon"
              className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
            >
              Retry
            </Button>
          </div>
        ) : (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Menu</h2>
            {menuContent.length > 0 ? (
              menuContent.map((item) => (
                <MenuItemComponent
                  key={item.id}
                  item={item}
                  depth={0}
                  onItemClick={onItemClick}
                />
              ))
            ) : (
              <p>No menu items available.</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

MenuDrawer.displayName = "MenuDrawer";

export default MenuDrawer;
