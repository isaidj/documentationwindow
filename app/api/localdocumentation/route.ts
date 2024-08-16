import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "formularios-camunda.md"
    );
    const fileContent = await fs.readFile(filePath, "utf8");
    return NextResponse.json({ content: fileContent });
  } catch (error) {
    console.error("Error loading documentation:", error);
    return NextResponse.json(
      { error: "Error loading documentation" },
      { status: 500 }
    );
  }
}
