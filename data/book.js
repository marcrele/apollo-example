const { gql } = require('apollo-server-lambda');

// The GraphQL schema in string form
const typeDefs = gql `
  type Book { 
    id: ID!
    title: String
    authors: [Author]
    createdAt: String
  }

  type BookAddResponse {
    success: Boolean!
    message: String
    book: Book    
  }

  type BookUpdateResponse {
    success: Boolean!
    message: String
    book: Book    
  }

  type BookListResponse {
    nextToken: String
    items: [Book]
  }

  type BookDeleteResponse {
    success: Boolean!
    message: String
  }
`;

module.exports = {
  typeDefs
};