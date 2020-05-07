const { ApolloServer, gql } = require('apollo-server-lambda');
const { makeExecutableSchema } = require('graphql-tools');

// The GraphQL schema in string form
const typeDefs = gql `
  type Book { title: String, author: String }
  type Query {
    hello: String
    books: [Book]
  }
`;

// Some fake data
const mockBooks = [{
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// The resolvers
const resolvers = {
  Query: {
    books: () => mockBooks,
    hello: () => 'Hello world!'
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,

  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: true,
  introspection: true,
});

exports.graphqlHandler = server.createHandler();