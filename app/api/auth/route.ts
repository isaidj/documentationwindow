import { MutationSignInByUserKeyArgs } from "./../../../domain/graphql/index";
import { publicGraphqlFetcher } from "@/domain/api/api.config";
import { Help } from "@/domain/graphql";
import { gql } from "@apollo/client";
import { NextResponse } from "next/server";
const API_KEY_GETOUTLINE = process.env.API_KEY_GETOUTLINE;

const SignInByUserKey = gql`
  mutation SignInByUserKey($usarApiKey: String!) {
    signInByUserKey(usarApiKey: $usarApiKey) {
      user {
        email
      }
      token
    }
  }
`;
const args = {
  usarApiKey: "a5015e1f-c515-4cf9-b5ca-763dfb380773",
};
export async function POST(req: Request) {
  const token = req.headers.get("Authorization");
  console.log("token", token);
  try {
    const response = await publicGraphqlFetcher<MutationSignInByUserKeyArgs>(
      SignInByUserKey,
      {
        usarApiKey: token,
      }
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error loading SignInByUserKey:", error);
    return NextResponse.json(
      { error: "Error loading SignInByUserKey" },
      { status: 500 }
    );
  }
}
