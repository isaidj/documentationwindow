import { publicGraphqlFetcher } from "@/domain/api/api.config";
import { Help } from "@/domain/graphql";
import { gql } from "@apollo/client";
import { NextResponse } from "next/server";
const API_KEY_GETOUTLINE = process.env.API_KEY_GETOUTLINE;

const queryHelps = gql`
  query Helps {
    helps {
      id
      url
      outlineId
    }
  }
`;
export async function GET() {
  try {
    // const response = await fetch(
    //   "https://app.getoutline.com/api/collections.info",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${API_KEY_GETOUTLINE}`,
    //     },
    //     body: JSON.stringify({
    //       id: "4909f793-de58-4c5c-a72d-f611df794e84",
    //     }),
    //   }
    // );
    const response = await publicGraphqlFetcher<{ data: Help[] }>(queryHelps);
    const data = response.data;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error loading documentation:", error);
    return NextResponse.json(
      { error: "Error loading documentation" },
      { status: 500 }
    );
  }
}
