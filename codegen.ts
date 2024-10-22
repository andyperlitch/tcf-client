import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/graphql",
  documents: [
    "src/gql/queries/**/*.ts",
    "src/gql/mutations/**/*.ts",
    "src/gql/fragments/**/*.ts",
  ],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    // "./src/gql/": {
    //   preset: "client",
    // },
    "./src/gql/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
