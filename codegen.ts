import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://nodejs.softwaretributario.com:7038/graphql",

  documents: ["app/**/*.tsx", "domain/graphql/**/*.graphqls"],
  verbose: true,
  generates: {
    "./domain/graphql/index.ts": {
      // preset: "client",
      // presetConfig: {
      //     gqlTagName: "gql",
      // },
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
  },
  // ignoreNoDocuments: true,
};

export default config;
