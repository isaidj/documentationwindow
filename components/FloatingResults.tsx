import React from "react";
import { FileText, Book, Code, Hash } from "lucide-react";
import DOMPurify from "dompurify";

interface OutlineDocument {
  id: string;
  title: string;
  url: string;
  text: string;
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

const typeIcons: Record<string, JSX.Element> = {
  default: <FileText className="text-blue-500" size={20} />,
  book: <Book className="text-green-500" size={20} />,
  code: <Code className="text-purple-500" size={20} />,
  hash: <Hash className="text-orange-500" size={20} />,
};

const getIconForDocument = (document: OutlineDocument): JSX.Element => {
  // You might want to implement logic here to determine the correct icon
  // based on the document properties. For now, we'll use a default icon.
  return typeIcons.default;
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
              className="flex items-start p-3 hover:bg-gray-50 rounded-md transition-colors duration-150 cursor-pointer"
              onClick={() => onResultClick(result.document.id)}
            >
              <div className="flex-shrink-0 mr-3">
                {getIconForDocument(result.document)}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-800">
                  {result.document.title}
                </h4>
                <p
                  className="text-xs text-gray-500 mt-1"
                  dangerouslySetInnerHTML={sanitizeHTML(result.context)}
                />
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
