const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { users } = require('./users');

const typeDefs = gql`
  type User {
    id: Int
    name: String
    age: Int
    created_date: String
  }

  type Query {
    users: [User]
  }
`;

const resolvers = {
  Query: {
    users: () => users,
  },
};

async function startServer() {
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

const app = express();

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000`);
});
