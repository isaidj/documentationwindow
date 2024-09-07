import { NextResponse } from "next/server";
import SearchResponse from "@/types/InterfaceSearchDocuments";

const API_KEY_GETOUTLINE = process.env.API_KEY_GETOUTLINE;
const ID_COLLECTIONS_DOCUMENTS = process.env.ID_COLLECTIONS_DOCUMENTS;

export async function POST(request: Request) {
  try {
    const req = await request.json();
    console.log("req:", req);
    const query = req.body.query;
    console.log(query);

    const documents_response = await fetch(
      "https://app.getoutline.com/api/documents.search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY_GETOUTLINE}`,
        },
        body: JSON.stringify({
          query: query,
          collectionId: ID_COLLECTIONS_DOCUMENTS,
          limit: 10,
        }),
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
