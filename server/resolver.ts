// A map of functions which return data for the schema.
export default {
  Query: {
    something: () => ({ butter: 'foo' }),
    whoami: () =>
      new Promise(res => {
        setTimeout(() => {
          res({ name: 'steve' })
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
