// DrawerHeader.tsx
import React from "react";
import {
  X,
  PanelLeftOpen,
  PanelLeftClose,
  Expand,
  Minimize2,
} from "lucide-react";

interface DrawerHeaderProps {
  isExpanded: boolean;
  toggleDrawer: () => void;
  toggleExpand: () => void;
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  isExpanded,
  toggleDrawer,
  toggleExpand,
}) => (
  <div className="flex justify-between items-center gap-1 p-4 bg-blue-600 text-white">
    <div className="flex gap-2">
      <button
        onClick={toggleExpand}
        className="text-white hover:text-blue-200 transition-colors"
        aria-label={isExpanded ? "Minimize drawer" : "Expand drawer"}
      >
        {isExpanded ? (
          <Minimize2 size={24} className="cursor-pointer" />
        ) : (
          <Expand size={24} className="cursor-pointer" />
        )}
      </button>
    </div>
    <h2 className="text-lg font-semibold">Documentación</h2>
    <button
      onClick={toggleDrawer}
      className="text-white hover:text-blue-200 transition-colors"
      aria-label="Close documentation drawer"
    >
      <X size={24} />
    </button>
  </div>
);
