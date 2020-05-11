const { ApolloServer } = require('apollo-server-lambda');
const typeDefs = require('./schema');
const { makeExecutableSchema } = require('graphql-tools');
const databaseManager = require('./databaseManager');

// The resolvers
const resolvers = {
  Query: {
    books: () => databaseManager.getBooks(),
    book: (_, { id }) => databaseManager.getBook({ id }),
    author: (_, { id }) => databaseManager.getAuthor({ id })
  },
  Book: {
    authors: (source) => source.authors.map(authorId => databaseManager.getAuthor({ id: authorId }))
  },
  Author: {
    books: (source) => source.books.map(bookId => databaseManager.getBook({ id: bookId }))
  }
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