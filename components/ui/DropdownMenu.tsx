import { ReactNode, useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

interface DropdownMenuProps {
  trigger: ReactNode;
  content: ReactNode | ((closeMenu: () => void) => ReactNode);
  className?: string;
  contentSide?: "left" | "right";
}

interface DropdownPosition {
  top: number;
  left: number;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  content,
  contentSide = "left",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] =
    useState<DropdownPosition | null>(null);

  const calculatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      return {
        top: rect.bottom + window.scrollY,
        left: contentSide === "left" ? rect.left : rect.right - 192, // 192px es el ancho del menú (w-48)
      };
    }
    return null;
  }, [contentSide]);

  const handleToggle = () => {
    if (!isOpen) {
      const newPosition = calculatePosition();
      if (newPosition) {
        setDropdownPosition(newPosition);
        setIsOpen(true);
      }
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        const newPosition = calculatePosition();
        if (newPosition) {
          setDropdownPosition(newPosition);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, calculatePosition]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <div ref={triggerRef} onClick={handleToggle}>
        {trigger}
      </div>
      {isOpen &&
        dropdownPosition &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-50 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              minWidth: "max-content",
            }}
          >
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {typeof content === "function" ? content(closeMenu) : content}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default DropdownMenu;
