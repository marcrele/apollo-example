const { gql } = require('apollo-server-lambda');

// The GraphQL schema in string form
const typeDefs = gql `
  type Book { 
    id: ID!
    title: String
    authors: [Author]
  }

  type Author {
    id: ID!
    name: String
    books: [Book]
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
    author(id: ID!): Author
  }
`;

module.exports = typeDefs;