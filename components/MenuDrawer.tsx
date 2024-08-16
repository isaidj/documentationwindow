import React, { useEffect, useState } from "react";
import axios from "axios";
import { DocumentItem, ResponseData } from "@/types/InterfaceMenuStructure";
import { ChevronDown, FileText } from "lucide-react";
import { useDocumentationDrawer } from "@/context/DocumentationDrawerContext";

interface MenuDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  menuWidth: number;
  path: string;
}

const MenuItemComponent: React.FC<{
  item: DocumentItem;
  depth: number;
  path: string;
}> = ({ item, depth, path }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(path);

  return (
    <div className="mb-1">
      <div
        className={`flex items-center justify-between p-2 hover:bg-gray-200 cursor-pointer rounded transition-colors duration-200 ease-in-out ${
          path === item.title ? "bg-blue-200" : ""
        }`}
        style={{ paddingLeft: `${(depth + 1) * 0.5}rem` }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center flex-grow">
          <div className="w-6 flex justify-center mr-2">
            <FileText size={18} className="text-gray-600" />
          </div>
          <span className="text-sm font-medium text-gray-700 truncate">
            {item.title}
          </span>
        </div>
        {item.children.length > 0 && (
          <div className="w-6 flex justify-center flex-shrink-0">
            <div
              className={`transform transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <ChevronDown size={18} className="text-gray-600" />
            </div>
          </div>
        )}
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {item.children.map((child) => (
          <MenuItemComponent
            key={child.id}
            item={child}
            depth={depth + 1}
            path={path}
          />
        ))}
      </div>
    </div>
  );
};

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

const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  setIsOpen,
  menuWidth,
}) => {
  const [loading, setLoading] = useState(false);
  const [menuContent, setMenuContent] = useState<DocumentItem[]>([]);
  const { pathname } = useDocumentationDrawer();

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const response = await axios.post<ResponseData>(
        "http://localhost:3000/api/documentation/collections-documents"
      );
      const data = response.data;
      setMenuContent(data.data);
    } catch (error) {
      console.error("Error loading menu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && menuContent.length === 0) {
      fetchMenu();
    }
  }, [isOpen]);

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
      ) : (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Menu</h2>
          {menuContent.map((item) => (
            <MenuItemComponent
              key={item.id}
              item={item}
              depth={0}
              path={pathname}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuDrawer;
