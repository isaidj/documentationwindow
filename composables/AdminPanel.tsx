import React, { useState, useEffect } from "react";
import axios from "axios";

interface UrlIdPair {
  id: string;
  url: string;
  idDocument: string;
}

const AdminPanel: React.FC = () => {
  const [urlIdPairs, setUrlIdPairs] = useState<UrlIdPair[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [newIdDocument, setNewIdDocument] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUrlIdPairs();
  }, []);

  const fetchUrlIdPairs = async () => {
    try {
      const response = await axios.get("/api/admin/url-id-pairs");
      setUrlIdPairs(response.data);
    } catch (error) {
      console.error("Error fetching URL-ID pairs:", error);
      setError("Error al cargar los datos. Por favor, intente nuevamente.");
    }
  };

  const handleAddPair = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/admin/url-id-pairs", {
        url: newUrl,
        idDocument: newIdDocument,
      });
      setNewUrl("");
      setNewIdDocument("");
      fetchUrlIdPairs();
    } catch (error) {
      console.error("Error adding URL-ID pair:", error);
      setError(
        "Error al agregar el par URL-ID. Por favor, intente nuevamente."
      );
    }
  };

  const handleUpdatePair = async (
    id: string,
    url: string,
    idDocument: string
  ) => {
    try {
      await axios.put(`/api/admin/url-id-pairs/${id}`, { url, idDocument });
      fetchUrlIdPairs();
    } catch (error) {
      console.error("Error updating URL-ID pair:", error);
      setError(
        "Error al actualizar el par URL-ID. Por favor, intente nuevamente."
      );
    }
  };

  const handleDeletePair = async (id: string) => {
    try {
      await axios.delete(`/api/admin/url-id-pairs/${id}`);
      fetchUrlIdPairs();
    } catch (error) {
      console.error("Error deleting URL-ID pair:", error);
      setError(
        "Error al eliminar el par URL-ID. Por favor, intente nuevamente."
      );
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Administrar Pares URL-ID</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleAddPair} className="mb-6">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="URL"
            className="flex-grow p-2 border rounded"
            required
          />
          <input
            type="text"
            value={newIdDocument}
            onChange={(e) => setNewIdDocument(e.target.value)}
            placeholder="ID del Documento"
            className="flex-grow p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Agregar
          </button>
        </div>
      </form>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">URL</th>
            <th className="text-left">ID del Documento</th>
            <th className="text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {urlIdPairs.map((pair) => (
            <tr key={pair.id}>
              <td>
                <input
                  type="text"
                  value={pair.url}
                  onChange={(e) =>
                    handleUpdatePair(pair.id, e.target.value, pair.idDocument)
                  }
                  className="w-full p-2 border rounded"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={pair.idDocument}
                  onChange={(e) =>
                    handleUpdatePair(pair.id, pair.url, e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </td>
              <td>
                <button
                  onClick={() => handleDeletePair(pair.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
