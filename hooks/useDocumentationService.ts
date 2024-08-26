import { useState, useCallback } from "react";
import axios from "axios";

export const useDocumentationService = () => {
  const [loading, setLoading] = useState(false);
  const [documentationContent, setDocumentationContent] = useState("");
  const [newDocumentationContent, setNewDocumentationContent] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchDocumentation = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const searchResponse = await axios.post(
        "/api/documentation/search-documents",
        { body: { query } }
      );

      const searchResults = searchResponse.data.data || [];
      setSearchResults(searchResults);

      if (searchResults.length > 0) {
        await fetchAndSetDocumentContent(searchResults[0].document.id);
      } else {
        setDocumentationContent("## No se encontraron resultados");
      }
    } catch (error) {
      console.error("Error loading documentation:", error);
      setDocumentationContent("## Error al cargar la documentación");
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  }, []);

  const fetchAndSetDocumentContent = useCallback(async (documentId: string) => {
    setLoading(true);
    try {
      const exportResponse = await axios.post(
        "/api/documentation/export-document",
        { id: documentId }
      );
      setDocumentationContent(exportResponse.data.data);
    } catch (error) {
      console.error("Error exporting document:", error);
      setDocumentationContent("## Error al exportar el documento");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    documentationContent,
    searchResults,
    hasSearched,
    fetchDocumentation,
    fetchAndSetDocumentContent,
  };
};
