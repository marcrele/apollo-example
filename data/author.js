const { gql } = require('apollo-server-lambda');

// The GraphQL schema in string form
const typeDefs = gql `
  type Author { 
    id: ID!
    name: String
    books: [Book]
    createdAt: String
  }

  type AuthorAddResponse {
    success: Boolean!
    message: String
    author: Author    
  }

  type AuthorUpdateResponse {
    success: Boolean!
    message: String
    author: Author    
  }

  type AuthorListResponse {
    nextToken: String
    items: [Author]
  }

  type AuthorDeleteResponse {
    success: Boolean!
    message: String
  }
`;

module.exports = {
  typeDefs
};