import { useApolloClient } from "@/hooks/useApolloClient";
import { ApolloProvider } from "@apollo/client";
import React from "react";

const AuthenticatedApolloProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const client = useApolloClient();

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AuthenticatedApolloProvider;
