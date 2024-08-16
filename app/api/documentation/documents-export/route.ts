import { NextResponse } from "next/server";
const API_KEY_GETOUTLINE = process.env.API_KEY_GETOUTLINE;
export async function POST(request: Request) {
  try {
    const req = await request.json();
    const { id } = req;

    const response = await fetch(
      "https://app.getoutline.com/api/documents.export",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY_GETOUTLINE}`,
        },
        body: JSON.stringify({
          id: id,
        }),
      }
    );
    const data = await response.json();
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
