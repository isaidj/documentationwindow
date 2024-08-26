import { NextResponse } from "next/server";

const API_KEY_GETOUTLINE = process.env.API_KEY_GETOUTLINE;

interface MockDataProps {
  url: string;
  idDocument: string;
}

const MockData: MockDataProps[] = [
  {
    url: "fixed-1",
    idDocument: "6DTrh6atiP",
  },
  {
    url: "fixed-2",
    idDocument: "X46oTC6IaK",
  },
  {
    url: "fixed-3",
    idDocument: "VzexYlINKQ",
  },
];

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const { url } = req;

    const data = MockData.filter((document) => document.url === url);

    if (data.length === 0) {
      return NextResponse.json(
        { error: "No matching document found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error loading documentation:", error);
    return NextResponse.json(
      { error: "Error loading documentation" },
      { status: 500 }
    );
  }
}
