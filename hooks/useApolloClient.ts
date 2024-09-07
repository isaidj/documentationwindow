import { useMemo } from "react";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth } from "@/context/AuthContext";

export const useApolloClient = () => {
  const { jwt } = useAuth();

  return useMemo(() => {
    const httpLink = createHttpLink({
      uri: "https://nodejs.softwaretributario.com:7038/graphql",
    });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: jwt ? `Bearer ${jwt}` : "",
        },
      };
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, [jwt]);
};
