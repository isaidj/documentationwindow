import { useApolloClient } from "@/hooks/useApolloClient";
import { ApolloProvider } from "@apollo/client";
import React from "react";
import { useAuth } from "./AuthContext";

const AuthenticatedApolloProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { loading, token } = useAuth();
  const client = useApolloClient();

  if (loading || !token) {
    return <div>Loading...</div>; // O cualquier otro componente de carga
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AuthenticatedApolloProvider;
