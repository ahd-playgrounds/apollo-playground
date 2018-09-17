const fs = require("fs");
const path = require("path");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

const app = express();

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world",
    persons: () =>
      new Promise(res => {
        setTimeout(() => {
          res([
            {
              name: "dave",
              age: 23,
              luckLevel: "HIGH"
            }
          ]);
        }, 1000);
      })
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      // "editor.theme": "light"
    }
  }
});

server.applyMiddleware({ app });

app.use("/api", (req, res) => {
  res.json({ hell: "nice" });
});

app.use(
  "/static",
  express.static(path.join(`${__dirname}/client/build/static`))
);

// Default every route except the above to serve the index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

app.use("*", req => {
  console.log(req.path);
  throw new Error("poop");
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
