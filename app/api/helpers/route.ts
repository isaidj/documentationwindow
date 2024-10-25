import { publicGraphqlFetcher } from "@/domain/api/api.config";
import { Help, HelpsQuery, QueryHelpsArgs } from "@/domain/graphql";
import { gql } from "@apollo/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
const API_KEY_GETOUTLINE = process.env.API_KEY_GETOUTLINE;

const queryHelps = gql`
  query Helps($where: FindHelpWhere) {
    helps(where: $where) {
      id
      description
      url
      outlineId
      createDate
      state
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
  let body: any;

  // Intentar leer el cuerpo de la solicitud, con manejo de errores en caso de que esté vacío o malformado
  try {
    body = await req.json();
  } catch (error) {
    body = {}; // Si no hay cuerpo o es inválido, inicializa como un objeto vacío
  }
  try {
    const args: QueryHelpsArgs = body;
    console.log("args", args);
    const response = await publicGraphqlFetcher<HelpsQuery[]>(
      queryHelps,
      args,
      jwt
    );
    const data = response;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error loading documentation:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
