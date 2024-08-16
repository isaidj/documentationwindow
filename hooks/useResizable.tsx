import { useState, useCallback, useEffect } from "react";

interface UseResizableProps {
  minWidth: number;
  maxWidthPercentage: number;
  defaultWidth: number;
  menuWidth: number;
}

export const useResizable = ({
  minWidth,
  maxWidthPercentage,
  defaultWidth,
  menuWidth,
}: UseResizableProps) => {
  const [totalWidth, setTotalWidth] = useState(defaultWidth);
  const [isResizing, setIsResizing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const updateMaxWidth = useCallback(() => {
    const maxWidth = window.innerWidth * maxWidthPercentage;
    setTotalWidth((current) => Math.min(current, maxWidth));
  }, [maxWidthPercentage]);

  useEffect(() => {
    updateMaxWidth();
    window.addEventListener("resize", updateMaxWidth);
    return () => window.removeEventListener("resize", updateMaxWidth);
  }, [updateMaxWidth]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;
      const newTotalWidth = window.innerWidth - e.clientX;
      const maxWidth = window.innerWidth * maxWidthPercentage;
      setTotalWidth(Math.max(minWidth, Math.min(newTotalWidth, maxWidth)));
    },
    [isResizing, minWidth, maxWidthPercentage]
  );

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const width = isMenuOpen ? totalWidth - menuWidth : totalWidth;

  return {
    totalWidth,
    width,
    isResizing,
    isMenuOpen,
    handleMouseDown,
    toggleMenu,
  };
};
