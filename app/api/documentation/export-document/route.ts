import { NextResponse } from "next/server";

const API_KEY_GETOUTLINE = process.env.API_KEY_GETOUTLINE;

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const { id } = req;

    const data = await exportDocument(id);
    const processedData = await processMediaUrls(data.data);

    return NextResponse.json({ ...data, data: processedData });
  } catch (error) {
    console.error("Error exporting document:", error);
    return NextResponse.json(
      { error: "Error exporting document" },
      { status: 500 }
    );
  }
}

const exportDocument = async (id: string) => {
  console.log("Exporting document with id:", id);
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
    throw error;
  }
};

const processMediaUrls = async (content: string): Promise<string> => {
  // Regex para imágenes
  const imageRegex =
    /!\[.*?\]\(\/api\/attachments\.redirect\?id=([a-f0-9-]+).*?\)/g;
  // Regex para videos
  const videoRegex =
    /\[.*?\.(?:mp4|webm|ogg).*?\]\(\/api\/attachments\.redirect\?id=([a-f0-9-]+).*?\)/g;

  // Procesar imágenes
  content = await processUrls(
    content,
    imageRegex,
    getAmazonUrl,
    (url) => `![](${url})`
  );

  // Procesar videos
  content = await processUrls(
    content,
    videoRegex,
    getAmazonUrl,
    (url, originalMatch) => {
      const fileName = originalMatch.match(/\[(.*?)\]/)?.[1] || "video";
      return `[${fileName}](${url})`;
    }
  );

  return content;
};

const processUrls = async (
  content: string,
  regex: RegExp,
  urlGetter: (id: string) => Promise<string | null>,
  replacer: (url: string, originalMatch: string) => string
): Promise<string> => {
  const matches = content.match(regex);

  if (!matches) return content;

  for (const match of matches) {
    const id = match.match(/id=([a-f0-9-]+)/)?.[1];
    if (id) {
      const amazonUrl = await urlGetter(id);
      if (amazonUrl) {
        content = content.replace(match, replacer(amazonUrl, match));
      }
    }
  }

  return content;
};

const getAmazonUrl = async (id: string): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://cs3develop.getoutline.com/api/attachments.redirect?id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY_GETOUTLINE}`,
        },
        redirect: "manual",
      }
    );

    if (response.status === 302) {
      const location = response.headers.get("location");
      if (location) {
        return location; // Esta es la URL de Amazon S3
      }
    }

    console.error(
      "Failed to get Amazon URL:",
      response.status,
      response.statusText
    );
    return null;
  } catch (error) {
    console.error("Error getting Amazon URL:", error);
    return null;
  }
};
