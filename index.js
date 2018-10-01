const fs = require("fs");
const path = require("path");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const resolvers = require("./resolvers");

const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

const app = express();

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

app.use("/api/users", (req, res) => {
  res.json({
    data: [
      {
        userId: "1234",
        userName: "Bill",
        userAge: "Age"
      }
    ]
  });
});

app.use(
  "/static",
  express.static(path.join(`${__dirname}/client/build/static`))
);

// Default every route except the above to serve the index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

app.get("/*", req => {
  console.log(req.path);
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
