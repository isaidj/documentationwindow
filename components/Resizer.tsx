import React from "react";
import { GripVertical } from "lucide-react";

interface ResizerProps {
  onMouseDown: (e: React.MouseEvent) => void;
  isOpen: boolean;
}

export const Resizer: React.FC<ResizerProps> = ({ onMouseDown, isOpen }) => {
  return (
    <div
      className="absolute left-0 top-0 bottom-0 w-4 cursor-ew-resize group"
      onMouseDown={onMouseDown}
    >
      <div
        className={`absolute z-50 -left-3 top-1/2 w-auto h-auto py-1 bg-white text-white group-hover:bg-blue-600 transition-colors rounded-sm shadow-2xl cursor-ew-resize ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <GripVertical
          size={20}
          className="text-gray-500 group-hover:text-white"
        />
      </div>
      <div className="absolute inset-y-0 left-0 w-0 bg-blue-300 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:w-[2px] group-hover:bg-blue-400"></div>
    </div>
  );
};
