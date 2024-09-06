import { publicGraphqlFetcher } from "@/domain/api/api.config";
import {
  CreateHelpInput,
  Help,
  HelpsQuery,
  MutationCreateHelpArgs,
  StateHelp,
  UpdateHelpInput,
} from "@/domain/graphql";
import { gql } from "@apollo/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
const API_KEY_GETOUTLINE = process.env.API_KEY_GETOUTLINE;

const mutationCreateHelp = gql`
  mutation CreateHelp($createInput: CreateHelpInput!) {
    createHelp(createInput: $createInput) {
      id
      url
      outlineId
      description
      state
      createDate
    }
  }
`;
export async function POST(req: Request) {
  const jwt = req.headers.get("Authorization");

  if (!jwt) {
    return NextResponse.json(
      { error: "No authorization jwt provided" },
      { status: 401 }
    );
  }

  try {
    const { createInput } = await req.json();

    if (
      !createInput ||
      !createInput.url ||
      !createInput.description ||
      !createInput.outlineId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newHelp: CreateHelpInput = {
      url: createInput.url,
      description: createInput.description,
      outlineId: createInput.outlineId,
      state: StateHelp.Active,
    };
    console.log("newHelp", newHelp);

    const response = await publicGraphqlFetcher<{ createHelp: any }>(
      mutationCreateHelp,
      { createInput: newHelp },
      jwt
    );

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Error creating new help item:", error);

    // Check if the error is a GraphQL error
    if (error.response?.errors && error.response.errors.length > 0) {
      const graphqlError = error.response.errors[0];
      return NextResponse.json(
        { error: graphqlError.message },
        {
          status:
            graphqlError.status || graphqlError.code === "BadRequestException"
              ? 400
              : 500,
        }
      );
    }

    // For any other type of error, return a generic error message
    return NextResponse.json(
      { error: "An unexpected error occurred while creating the help item" },
      { status: 500 }
    );
  }
}

const queryHelps = gql`
  query Help($helpId: Float!) {
    help(helpId: $helpId) {
      id
      description
      url
      outlineId
      createDate
      state
    }
  }
`;
export async function GET(req: Request) {
  const jwt = req.headers.get("Authorization");
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!jwt) {
    return NextResponse.json(
      { error: "No authorization jwt provided" },
      { status: 401 }
    );
  }

  if (!id) {
    return NextResponse.json({ error: "No help ID provided" }, { status: 400 });
  }

  try {
    const response = await publicGraphqlFetcher<{ help: Help | null }>(
      queryHelps,
      { helpId: Number(id) },
      jwt
    );

    if (response.help === null) {
      return NextResponse.json(
        { error: "Help item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Error loading documentation:", error);

    // Check if the error is due to the non-nullable field
    if (
      error.response?.errors?.[0]?.message.includes(
        "Cannot return null for non-nullable field"
      )
    ) {
      return NextResponse.json(
        { error: "Help item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Error loading documentation" },
      { status: 500 }
    );
  }
}
const mutationHelps = gql`
  mutation UpdateHelp($updateInput: UpdateHelpInput!) {
    updateHelp(updateInput: $updateInput) {
      id
      description
      url
      outlineId
      createDate
      state
    }
  }
`;

export async function PATCH(req: Request) {
  const jwt = req.headers.get("Authorization");

  if (!jwt) {
    return NextResponse.json(
      { error: "No authorization jwt provided" },
      { status: 401 }
    );
  }

  let body: any;
  let updateInput: UpdateHelpInput | undefined;

  try {
    body = await req.json();
    updateInput = body.updateInput;

    if (!updateInput) {
      return NextResponse.json(
        { error: "No updateInput provided" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error parsing JSON body:", error);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    if (!updateInput) {
      return NextResponse.json(
        { error: "No updateInput provided" },
        { status: 400 }
      );
    }

    const response = await publicGraphqlFetcher<UpdateHelpInput>(
      mutationHelps,
      {
        updateInput: {
          id: updateInput.id,
          description: updateInput.description,
          url: updateInput.url,
          outlineId: updateInput.outlineId,
          state: updateInput.state,
        },
      },
      jwt
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error updating documentation:", error);
    return NextResponse.json(
      { error: "Error updating documentation" },
      { status: 500 }
    );
  }
}
