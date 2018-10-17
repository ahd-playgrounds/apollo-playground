// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    something: () => "random string",
    whoami: () =>
      new Promise(res => {
        setTimeout(() => {
          console.log(
            "doing heavy lifting for whoami - i never want to see this twice"
          );
          res({
            id: "890",
            name: "Bob"
          });
        }, 1000);
      }),
    persons: () =>
      new Promise(res => {
        setTimeout(() => {
          res([
            {
              id: "1234",
              name: "dave",
              age: 23,
              luckLevel: "HIGH"
            }
          ]);
        }, 500);
      })
  }
};

module.exports = resolvers;
