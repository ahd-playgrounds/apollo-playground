const fs = require("fs");
const path = require("path");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./resolver");

const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.use(
  "/static",
  express.static(path.join(`${__dirname}/client/build/static`))
);

app.get("/api/content", (req, res) => {
  res.json({
    data: [
      { contentData_1: "some cms lovliness" },
      {
        contentData_2: {
          nested_1: "nested stuff! 1",
          nested_2: "nested stuff! 2"
        }
      }
    ]
  });
});
app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
