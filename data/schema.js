const { gql } = require('apollo-server-lambda');
const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');
const { typeDefs: Author } = require('./author');
const { typeDefs: Book } = require('./book');
const { resolvers: authorResolvers } = require('./../lambda-functions/author/authorResolvers');
const { resolvers: bookResolvers } = require('./../lambda-functions/book/bookResolvers');

// The GraphQL schema in string form
const typeDefs = gql `
  type Query {
    author(id: ID!): Author
    authors: AuthorListResponse
    books: BookListResponse
    book(id: ID!): Book
  }

  type Mutation {
    addAuthor(name: String!, books: [ID]): AuthorAddResponse!
    updateAuthor(id: ID!, name: String, books: [ID]): AuthorUpdateResponse!
    deleteAuthor(id: ID!): AuthorDeleteResponse!
    addBook(title: String!, authors: [ID]): BookAddResponse!
    updateBook(id: ID!, title: String, authors: [ID]): BookUpdateResponse!
    deleteBook(id: ID!): BookDeleteResponse!
  }
`;

module.exports = makeExecutableSchema({
  typeDefs: [Author, Book, typeDefs],
  resolvers: merge(authorResolvers, bookResolvers),
});