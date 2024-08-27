import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import { CollectionDocument } from "@/types/InterfaceCollectionDocument";

// interface Document {
//   id: string;
//   url: string;
//   title: string;
//   children: Document[];
// }

// interface ApiResponse {
//   data: Document[];
// }

interface BreadcrumbsProps {
  currentId: string;
  documents: CollectionDocument[];
  onLinkClick: (id: string) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentId,
  documents,
  onLinkClick,
}) => {
  const [error, setError] = useState("");

  //parte compleja,
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

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-1">
        {currentPath.map((doc, index) => (
          <li key={doc.id}>
            <div className="flex items-center">
              {index > 0 && <ChevronRight className="w-5 h-5 text-gray-400" />}

              <a
                // href={doc.url}
                onClick={(e) => {
                  e.preventDefault();
                  onLinkClick(doc.id);
                  e.stopPropagation();
                }}
                className={`ml-1 text-xs text-nowrap font-medium ${
                  index === currentPath.length - 1
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {doc.title}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
