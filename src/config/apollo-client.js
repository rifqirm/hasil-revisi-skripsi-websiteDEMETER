import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://devoted-caiman-16.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret":
      "922iPVtHI3Q7Btjb07zfrQQLCK4zZe6TOe296N6LEFnvsaonGB6BdAlmRraReD4S",
  },
});

export default client;