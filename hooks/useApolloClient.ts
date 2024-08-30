import { useMemo } from "react";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth } from "@/context/AuthContext";

export const useApolloClient = () => {
  const { getToken } = useAuth();

  return useMemo(() => {
    const httpLink = createHttpLink({
      uri: "https://nodejs.softwaretributario.com:7038/graphql",
    });

    const authLink = setContext(async (_, { headers }) => {
      const token = await getToken();
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, [getToken]);
};
