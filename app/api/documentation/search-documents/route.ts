import { NextResponse } from "next/server";
import SearchResponse from "@/types/InterfaceSearchDocuments";

const API_KEY_GETOUTLINE = process.env.API_KEY_GETOUTLINE;
export interface SearchRequestBody {
  query: string;
  limit: number;
  collectionId?: string;
}
export async function POST(request: Request) {
  try {
    const req = await request.json();
    console.log("req:", req);
    const query = req.body.query;
    const collectionId = req.body.collectionId;

    // Construir el cuerpo de la solicitud de forma dinámica
    const requestBody: SearchRequestBody = {
      query: query,
      limit: 10,
    };

    // Solo incluir `collectionId` si existe
    if (collectionId) {
      requestBody.collectionId = collectionId;
    }

    const documents_response = await fetch(
      "https://app.getoutline.com/api/documents.search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY_GETOUTLINE}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    const documents_data: SearchResponse = await documents_response.json();

    return NextResponse.json(documents_data);
  } catch (error) {
    console.error("Error loading documentation:", error);
    return NextResponse.json(
      { error: "Error loading documentation" },
      { status: 500 }
    );
  }
}
