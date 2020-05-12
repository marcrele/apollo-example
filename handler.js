const { ApolloServer } = require('apollo-server-lambda');
const typeDefs = require('./schema');
const { makeExecutableSchema } = require('graphql-tools');
const databaseManager = require('./databaseManager');
const jose = require('jose')

// The resolvers
const resolvers = {
  Query: {
    books: (parent, args, context) => databaseManager.getBooks(),
    book: (parent, { id }, context) => databaseManager.getBook({ id }),
    author: (parent, { id }, context) => databaseManager.getAuthor({ id })
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
  context: ({ event }) => {
    // console.log("event", event);
    const token = event.headers.Authorization || '';
    // console.log("token", token);
    const user = getUser(token);
    if (!user) throw new AuthenticationError('you must be logged in');
    return { user };
  },
  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: true,
  introspection: true,
});

const getUser = (token) => {
  const decoded = jose.JWT.decode(token.split(' ')[1]);
  // console.log("decoded", decoded);
  const user = decoded['cognito:username'];
  // console.log("user", user);
  return user;
}

exports.graphqlHandler = server.createHandler();