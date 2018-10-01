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

module.exports = resolvers;
