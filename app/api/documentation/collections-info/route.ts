import { NextResponse } from "next/server";
const API_KEY_GETOUTLINE = process.env.API_KEY_GETOUTLINE;
export async function POST() {
  try {
    const response = await fetch(
      "https://app.getoutline.com/api/collections.info",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY_GETOUTLINE}`,
        },
        body: JSON.stringify({
          id: "4909f793-de58-4c5c-a72d-f611df794e84",
        }),
      }
    );
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
