import { OperationVariables } from "@apollo/client";
import { DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";
export const publicGrahp = new GraphQLClient(
  "https://nodejs.softwaretributario.com:7038" + "/graphql"
);

export async function publicGraphqlFetcher<T>(
  query: DocumentNode,
  variables?: OperationVariables
) {
  //   let userCookie = Cookies.get(import.meta.env.VITE_USER_TOKEN);
  //   if (userCookie) {
  //     publicGrahp.setHeader("Authorization", "Bearer " + userCookie!);
  //   }

  const response: T = await publicGrahp.request<T>(query, variables);
  return response;
}
