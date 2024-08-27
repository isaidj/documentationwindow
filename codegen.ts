import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://nodejs.softwaretributario.com:7005/graphql",

  documents: ["src/**/*.tsx", "src/domain/graphql/**/*.graphqls"],
  verbose: true,
  generates: {
    "./src/domain/graphql/index.ts": {
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
