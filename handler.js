const { ApolloServer, gql } = require('apollo-server-lambda');
const { makeExecutableSchema } = require('graphql-tools');
const databaseManager = require('./databaseManager');

// The GraphQL schema in string form
const typeDefs = gql `
  type Book { title: String, authors: [Author] }
  type Author { name: String, books: [Book] }
  type Query {
    hello: String
    books: [Book]
    book(bookId: String!): Book
    author: Author
  }
`;

// The resolvers
const resolvers = {
  Query: {
    books: () => databaseManager.getBooks(),
    book: (_source, { bookId }) => databaseManager.getBook(bookId),
    author: () => databaseManager.getAuthor(),
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