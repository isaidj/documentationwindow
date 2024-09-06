import { NextResponse } from "next/server";
const API_KEY_GETOUTLINE = process.env.API_KEY_GETOUTLINE;
const ID_COLLECTIONS_DOCUMENTS = process.env.ID_COLLECTIONS_DOCUMENTS;
export async function POST(request: Request) {
  try {
    // const req = await request.json();
    // const { idCurrentPage } = req;
    const response = await fetch(
      "https://app.getoutline.com/api/collections.documents",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY_GETOUTLINE}`,
        },
        body: JSON.stringify({
          id: ID_COLLECTIONS_DOCUMENTS,
        }),
      }
    );
    console.log(response);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error loading documentation:", error);
    return NextResponse.json(
      { error: "Error loading documentation" },
      { status: 500 }
    );
  }
}
