import { NextResponse } from "next/server";
import SearchResponse from "@/types/InterfaceSearchDocuments";
const API_KEY_GETOUTLINE = process.env.API_KEY_GETOUTLINE;
export async function POST(request: Request) {
  try {
    const req = await request.json();
    const pathname = req.body.pathname;
    console.log(pathname);
    const documents_response = await fetch(
      "https://app.getoutline.com/api/documents.search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY_GETOUTLINE}`,
        },
        body: JSON.stringify({
          query: pathname,
          collectionId: "4909f793-de58-4c5c-a72d-f611df794e84",
          limit: 10,
        }),
      }
    );
    const documents_data: SearchResponse = await documents_response.json();
    // console.log(documents_data.data[0].document.id);
    const data = await exportDocument(documents_data.data[0].document.id);
    // console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error loading documentation:", error);
    return NextResponse.json(
      { error: "Error loading documentation" },
      { status: 500 }
    );
  }
}

const exportDocument = async (id: string) => {
  console.log("id", id);
  try {
    const response = await fetch(
      "https://app.getoutline.com/api/documents.export",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY_GETOUTLINE}`,
        },
        body: JSON.stringify({
          id,
        }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in exportDocument:", error);
    throw error; // Re-throw the error to be caught in the main POST function
  }
};
