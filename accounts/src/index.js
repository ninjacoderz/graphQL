
import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { dirname, resolve } from "path"
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

import resolvers from "./graphql/resolvers.js";
const _dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT;
const typeDefs = gql(
    readFileSync(resolve( _dirname, "./graphql/schema.graphql"), "utf-8")
);

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    context: ({ req }) => {
        const user = req.headers.user ? JSON.parse(req.headers.user) : null;
        return { user };
    }
        
});

const { url } = await server.listen({ port });
console.log(`Accounts service ready at ${url}`);