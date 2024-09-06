import React, { useState, useEffect, useRef, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { ChevronUp, ChevronDown } from "lucide-react";
import remarkGfm from "remark-gfm";

export interface MarkdownVisualizerProps {
  markdown_text?: string;
  data?: {
    title?: string;
    id: string;
  };

  search?: string;
}

type CustomComponentProps = {
  children?: React.ReactNode;
  [key: string]: any;
};

const MarkdownVisualizer = ({
  markdown_text,
  data,
  search,
}: MarkdownVisualizerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);

  const normalizeText = (text: string): string => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

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
    const normalizedSearch = normalizeText(search);
    const parts = normalizeText(text).split(normalizedSearch);
    let lastIndex = 0;
    return parts.map((part, i) => {
      if (i === 0) {
        lastIndex = part.length;
        return text.slice(0, part.length);
      }
      const start = lastIndex;
      const end = lastIndex + normalizedSearch.length;
      lastIndex = end + part.length;
      return (
        <>
          <mark key={i} className="bg-yellow-200">
            {text.slice(start, end)}
          </mark>
          {text.slice(end, lastIndex)}
        </>
      );
    });
  };

  const customComponents = useMemo(
    () => ({
      h1: ({ children, ...props }: CustomComponentProps) => (
        <h1 className="text-3xl font-bold mt-8 mb-4" {...props}>
          {highlightText(children)}
        </h1>
      ),
      h2: ({ children, ...props }: CustomComponentProps) => (
        <h2 className="text-2xl font-semibold mt-6 mb-3" {...props}>
          {highlightText(children)}
        </h2>
      ),
      h3: ({ children, ...props }: CustomComponentProps) => (
        <h3 className="text-xl font-medium mt-4 mb-2" {...props}>
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
        <li className="mb-2" {...props}>
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
      code: ({ children, ...props }: CustomComponentProps) => (
        <code
          className="bg-gray-100 rounded p-1 whitespace-pre-wrap"
          {...props}
        >
          {highlightText(children)}
        </code>
      ),
      pre: ({ children, ...props }: CustomComponentProps) => (
        <pre
          className="bg-gray-100 rounded p-4 my-4 overflow-x-auto"
          {...props}
        >
          {highlightText(children)}
        </pre>
      ),
      strong: ({ children, ...props }: CustomComponentProps) => (
        <strong className="font-semibold" {...props}>
          {highlightText(children)}
        </strong>
      ),
      img: ({ src, alt, ...props }: CustomComponentProps) => (
        <img src={src} alt={alt} className="my-4 max-w-full" {...props} />
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
          <a
            className="text-blue-600 hover:underline"
            href={href}
            target="_blank"
            {...props}
          >
            {highlightText(children)}
          </a>
        );
      },
      // Nuevos componentes para las tablas
      table: ({ children, ...props }: CustomComponentProps) => (
        <table
          className="min-w-full border-collapse border border-gray-300 my-4"
          {...props}
        >
          {children}
        </table>
      ),
      thead: ({ children, ...props }: CustomComponentProps) => (
        <thead className="bg-gray-100" {...props}>
          {children}
        </thead>
      ),
      tbody: ({ children, ...props }: CustomComponentProps) => (
        <tbody className="bg-white" {...props}>
          {children}
        </tbody>
      ),
      tr: ({ children, ...props }: CustomComponentProps) => (
        <tr className="border-b border-gray-300" {...props}>
          {children}
        </tr>
      ),
      th: ({ children, ...props }: CustomComponentProps) => (
        <th
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          {...props}
        >
          {highlightText(children)}
        </th>
      ),
      td: ({ children, ...props }: CustomComponentProps) => (
        <td
          className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-500"
          {...props}
        >
          {highlightText(children)}
        </td>
      ),
      mark: ({ children, ...props }: CustomComponentProps) => (
        <mark className="bg-yellow-200" {...props}>
          {children}
        </mark>
      ),
      //salto de linea
    }),
    [highlightText]
  );

  return (
    <div className="relative markdown-content">
      <div ref={containerRef} className="mb-16">
        <h1 className="text-4xl font-bold mb-8">{data?.title}</h1>
        <ReactMarkdown
          components={customComponents}
          remarkPlugins={[remarkGfm]}
        >
          {markdown_text}
        </ReactMarkdown>
      </div>
      {search && (
        <div className="fixed bottom-4 left-4 bg-white p-2 rounded-lg shadow-md flex items-center space-x-2">
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
