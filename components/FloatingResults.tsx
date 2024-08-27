import React, { useEffect, useState } from "react";
import { FileText, Book, Code, Hash } from "lucide-react";
import DOMPurify from "dompurify";
import Breadcrumbs from "./Breadcrumbs";
import axios from "axios";
import {
  CollectionDocument,
  CollectionDocumentResponse,
} from "../types/InterfaceCollectionDocument";
interface OutlineDocument {
  id: string;
  title: string;
  url: string;
  text: string;
  icon: string;
}

interface OutlineSearchResult {
  ranking: number;
  context: string;
  document: OutlineDocument;
}

interface FloatingSearchResultsProps {
  results: OutlineSearchResult[];
  onResultClick: (documentId: string) => void;
}

const getIconForDocument = (document: OutlineDocument): JSX.Element => {
  // You might want to implement logic here to determine the correct icon
  // based on the document properties. For now, we'll use a default icon.
  if (document.icon) {
    return <span className="">{document.icon}</span>;
  } else {
    return <FileText size={20} className="text-blue-600" />;
  }
};

const sanitizeHTML = (html: string) => {
  return {
    __html: DOMPurify.sanitize(html),
  };
};

const FloatingSearchResults: React.FC<FloatingSearchResultsProps> = ({
  results,
  onResultClick,
}) => {
  const [documentationStructure, setDocumentationStructure] = useState<
    CollectionDocument[]
  >([]);
  const fetchColletionsDocuments = async (url: string) => {
    try {
      const response = await axios.post<CollectionDocumentResponse>(
        "/api/documentation/collections-documents",
        {
          url: url,
        }
      );
      setDocumentationStructure(response.data.data);
    } catch (error) {
      console.error("Error loading documentation:", error);
    }
  };
  useEffect(() => {
    fetchColletionsDocuments("url");
  }, []);
  return (
    <div className="absolute mt-2 z-50 w-full top-auto left-0 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Resultados de búsqueda
        </h3>
      </div>
      <div className="max-h-[60vh] overflow-y-auto">
        <div className="px-4 space-y-3">
          {results.map((result) => (
            <div
              key={result.document.id}
              className="flex flex-col items-start p-3 hover:bg-gray-50 rounded-md transition-colors duration-150 cursor-pointer"
              onClick={() => {
                onResultClick(result.document.id);
                console.log(result.document);
              }}
            >
              <div className="flex items-start">
                <div>
                  <div className="flex flex-shrink-0 mr-3">
                    <div className="flex-shrink-0 mr-3">
                      {getIconForDocument(result.document)}
                    </div>
                    <h4 className="text-sm font-medium text-gray-800">
                      {result.document.title}
                    </h4>
                  </div>
                  {documentationStructure.length !== 0 ? (
                    <Breadcrumbs
                      currentId={result.document.id}
                      documents={documentationStructure}
                      onLinkClick={onResultClick}
                    />
                  ) : null}
                  <p
                    className="text-xs text-gray-500 mt-1"
                    dangerouslySetInnerHTML={sanitizeHTML(result.context)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {results.length > 0 && (
        <div className="bg-gray-50 px-4 py-3 text-right">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            Ver todos los resultados
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingSearchResults;
