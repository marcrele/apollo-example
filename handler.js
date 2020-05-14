const { ApolloServer } = require('apollo-server-lambda');
const schema = require('./data/schema');
const jose = require('jose')

const server = new ApolloServer({
  schema,
  context: ({ event }) => {
    const token = event.headers.Authorization || '';
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
  const user = decoded['cognito:username'];
  return user;
}

exports.graphqlHandler = server.createHandler();