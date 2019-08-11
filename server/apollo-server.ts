import fs from "fs";
import "reflect-metadata";
import path from "path";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { CustomerResolver } from "./customer";
import { buildSchema } from "type-graphql";

const app = express();

buildSchema({
  resolvers: [CustomerResolver],
  emitSchemaFile: path.resolve(__dirname, "schema.gql"),
}).then(schema => {
  const server = new ApolloServer({ schema });

  server.applyMiddleware({ app });

  app.use(
    "/static",
    express.static(path.join(`${__dirname}/client/build/static`))
  );

  app.get("/", (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/build/index.html`));
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})
