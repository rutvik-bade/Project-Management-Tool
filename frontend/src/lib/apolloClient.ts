import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql", // Django GraphQL endpoint
});

// Add the X-Organization header to each request
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "X-Organization": "acme-inc",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;