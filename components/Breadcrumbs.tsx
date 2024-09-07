import React from "react";
import { ChevronRight } from "lucide-react";
import { CollectionDocument } from "@/types/InterfaceCollectionDocument";

interface BreadcrumbsProps {
  currentId: string;
  documents: CollectionDocument[];
  onLinkClick: (id: string) => void;
  isLoading?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentId,
  documents,
  onLinkClick,
  isLoading = false,
}) => {
  const findDocumentPath = (
    docs: CollectionDocument[],
    targetId: string,
    path: CollectionDocument[] = []
  ): CollectionDocument[] | null => {
    for (const doc of docs) {
      if (doc.id === targetId) {
        return [...path, doc];
      }
      if (doc.children.length > 0) {
        const result = findDocumentPath(doc.children, targetId, [...path, doc]);
        if (result) return result;
      }
    }
    return null;
  };

  const currentPath = findDocumentPath(documents, currentId) || [];

  const commonClasses = "flex items-center h-6 text-xs leading-6";
  const skeletonItemClasses = "bg-gray-200 rounded animate-pulse h-4";

  if (isLoading || currentPath.length === 0) {
    return (
      <div className={`${commonClasses} space-x-1`} aria-hidden="true">
        <div className={`${skeletonItemClasses} w-20`}></div>
        <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
        <div className={`${skeletonItemClasses} w-24`}></div>
        <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
        <div className={`${skeletonItemClasses} w-28`}></div>
      </div>
    );
  }

  return (
    <nav className={commonClasses} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {currentPath.map((doc, index) => (
          <li key={doc.id} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1 flex-shrink-0" />
            )}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onLinkClick(doc.id);
              }}
              className={`truncate max-w-[150px] font-medium ${
                index === currentPath.length - 1
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {doc.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
