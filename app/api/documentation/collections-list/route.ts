import { NextResponse } from "next/server";
const API_KEY_GETOUTLINE = process.env.API_KEY_GETOUTLINE;
export async function POST() {
  try {
    const response = await fetch(
      "https://app.getoutline.com/api/collections.list",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY_GETOUTLINE}`,
        },
        body: JSON.stringify({
          id: "7SBc9y99GU",
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
