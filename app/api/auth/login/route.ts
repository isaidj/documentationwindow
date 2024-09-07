import { MutationSignInByUserKeyArgs } from "../../../../domain/graphql/index";
import { publicGraphqlFetcher } from "@/domain/api/api.config";
import { gql } from "@apollo/client";
import { NextResponse } from "next/server";

const SignInByUserKey = gql`
  mutation SignInByUserKey($usarApiKey: String!) {
    signInByUserKey(usarApiKey: $usarApiKey) {
      token
      user {
        username
        type
        id
        firstTime
      }
      userPermission {
        detailSystemConsult
      }
    }
  }
`;

export async function POST(req: Request) {
  const token = req.headers.get("Authorization");

  if (!token) {
    return NextResponse.json(
      { error: "No authorization token provided" },
      { status: 401 }
    );
  }

  try {
    const response = await publicGraphqlFetcher<MutationSignInByUserKeyArgs>(
      SignInByUserKey,
      {
        usarApiKey: token,
      }
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in SignInByUserKey:", error);
    return NextResponse.json(
      { error: "Error loading SignInByUserKey" },
      { status: 500 }
    );
  }
}
