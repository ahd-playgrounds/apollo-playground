import fs from "fs";
import path from "path";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolver";

const typeDefs = fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8");

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

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
