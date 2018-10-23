// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    something: () => "random string",
    whoami: () => ({
      id: "890",
      name: "Bob"
    })
  }
};

module.exports = resolvers;
