import React, { useState, useEffect, useRef, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { ChevronUp, ChevronDown } from "lucide-react";

interface MarkdownVisualizerProps {
  content: string;
  search?: string;
}

type CustomComponentProps = {
  children?: React.ReactNode;
  [key: string]: any;
};

const MarkdownVisualizer = ({ content, search }: MarkdownVisualizerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);

  useEffect(() => {
    if (search && containerRef.current) {
      const matches = containerRef.current.querySelectorAll("mark");
      setTotalMatches(matches.length);
      setCurrentMatchIndex(matches.length > 0 ? 1 : 0);
      if (matches.length > 0) {
        scrollToMatch(0);
      }
    } else {
      setTotalMatches(0);
      setCurrentMatchIndex(0);
    }
  }, [search]);

  const scrollToMatch = (index: number) => {
    const matches = containerRef.current?.querySelectorAll("mark");
    if (matches && matches[index]) {
      matches[index].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const navigateMatches = (direction: "up" | "down") => {
    if (totalMatches === 0) return;
    let newIndex =
      direction === "up" ? currentMatchIndex - 1 : currentMatchIndex + 1;
    if (newIndex < 1) newIndex = totalMatches;
    if (newIndex > totalMatches) newIndex = 1;
    setCurrentMatchIndex(newIndex);
    scrollToMatch(newIndex - 1);
  };

  const highlightText = (text: React.ReactNode): React.ReactNode => {
    if (!search || typeof text !== "string") return text;
    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === search?.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const customComponents = useMemo(
    () => ({
      h1: ({ children, ...props }: CustomComponentProps) => (
        <h1 className="text-2xl font-bold mb-4" {...props}>
          {highlightText(children)}
        </h1>
      ),
      h2: ({ children, ...props }: CustomComponentProps) => (
        <h2 className="text-xl font-semibold mb-3" {...props}>
          {highlightText(children)}
        </h2>
      ),
      h3: ({ children, ...props }: CustomComponentProps) => (
        <h3 className="text-lg font-medium mb-2" {...props}>
          {highlightText(children)}
        </h3>
      ),
      p: ({ children, ...props }: CustomComponentProps) => (
        <p className="mb-4" {...props}>
          {highlightText(children)}
        </p>
      ),
      ul: ({ children, ...props }: CustomComponentProps) => (
        <ul className="list-disc pl-5 mb-4" {...props}>
          {children}
        </ul>
      ),
      ol: ({ children, ...props }: CustomComponentProps) => (
        <ol className="list-decimal pl-5 mb-4" {...props}>
          {children}
        </ol>
      ),
      li: ({ children, ...props }: CustomComponentProps) => (
        <li className="mb-1" {...props}>
          {highlightText(children)}
        </li>
      ),
      blockquote: ({ children, ...props }: CustomComponentProps) => (
        <blockquote
          className="border-l-4 border-gray-300 pl-4 italic my-4"
          {...props}
        >
          {highlightText(children)}
        </blockquote>
      ),
      pre: ({ children, ...props }: CustomComponentProps) => (
        <code
          className="block bg-gray-100 rounded p-2 my-2 whitespace-pre-wrap"
          {...props}
        >
          {highlightText(children)}
        </code>
      ),
      strong: ({ children, ...props }: CustomComponentProps) => (
        <strong className="font-semibold" {...props}>
          {highlightText(children)}
        </strong>
      ),
      img: ({ src, alt, ...props }: CustomComponentProps) => (
        <img src={src} alt={alt} className="my-4" {...props} />
      ),
      a: ({ href, children, ...props }: CustomComponentProps) => {
        if (
          href &&
          (href.includes(".webm") ||
            href.includes(".mp4") ||
            href.includes(".ogg"))
        ) {
          return (
            <video controls className="my-4 max-w-full" src={href}>
              Tu navegador no soporta el elemento de video.
            </video>
          );
        }
        return (
          <a className="text-blue-600 hover:underline" href={href} {...props}>
            {highlightText(children)}
          </a>
        );
      },
    }),
    [highlightText]
  );

  return (
    <div className="relative">
      <div ref={containerRef}>
        <ReactMarkdown components={customComponents}>{content}</ReactMarkdown>
      </div>
      {search && (
        <div className="fixed bottom-4 right-4 bg-white p-2 rounded-lg shadow-md flex items-center space-x-2">
          {totalMatches > 0 ? (
            <>
              <button
                onClick={() => navigateMatches("up")}
                className="p-1 rounded hover:bg-gray-200"
              >
                <ChevronUp size={24} />
              </button>
              <span className="text-sm">
                {currentMatchIndex} / {totalMatches}
              </span>
              <button
                onClick={() => navigateMatches("down")}
                className="p-1 rounded hover:bg-gray-200"
              >
                <ChevronDown size={24} />
              </button>
            </>
          ) : (
            <span className="text-sm text-gray-500">
              No se encontraron coincidencias
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default MarkdownVisualizer;
