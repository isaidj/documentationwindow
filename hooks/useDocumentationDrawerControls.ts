import { useState, useEffect, useCallback } from "react";

interface UseDocumentationDrawerControlsProps {
  initialIsOpen: boolean;
  initialIsExpanded: boolean;
  onToggleDrawer: (isOpen: boolean) => void;
  setDrawerWidth: (width: number) => void;
}

export const useDocumentationDrawerControls = ({
  initialIsOpen,
  initialIsExpanded,
  onToggleDrawer,
  setDrawerWidth,
}: UseDocumentationDrawerControlsProps) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [isExpanded, setIsExpanded] = useState(initialIsExpanded);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "toggleDrawer") {
        setIsOpen(event.data.isOpen);
      }
      if (event.data && event.data.type === "toggleExpand") {
        setIsExpanded(event.data.isOpen);
      }
      if (event.data && event.data.type === "iframeWidth") {
        setDrawerWidth(event.data.width);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F1") {
        event.preventDefault();
        toggleDrawer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleDrawer = useCallback(() => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onToggleDrawer(newIsOpen);
    window.parent.postMessage({ type: "drawerToggle", isOpen: newIsOpen }, "*");
  }, [isOpen, onToggleDrawer]);

  const toggleExpand = useCallback(() => {
    const newIsExpanded = !isExpanded;
    setIsExpanded(newIsExpanded);
    window.parent.postMessage(
      { type: "expandToggle", isOpen: newIsExpanded },
      "*"
    );
  }, [isExpanded]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    isExpanded,
    isMenuOpen,
    toggleDrawer,
    toggleExpand,
    toggleMenu,
  };
};
