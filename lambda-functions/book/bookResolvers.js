const { createBook, getBook, updateBook, listBooks } = require('./bookApi');
const { getAuthors } = require('./../author/authorApi');

// The resolvers
resolvers = {
  Query: {
    books: (_, { nextToken, limit }) => listBooks({ nextToken, limit }),
    book: (_, { id }) => getBook({ id })
  },
  Book: {
    authors: (parent) => getAuthors({ ids: parent.authors })
  },
  Mutation: {
    addBook: (_, { title, authors = [] }) => {
      const addedBook = createBook({ title, authors });
      return {
        success: true,
        message: "well done",
        book: addedBook
      };
    },
    updateBook: (_, { id, title, authors }) => {
      const updatedBook = updateBook({ id, title, authors });
      return {
        success: true,
        message: "well done",
        book: updatedBook
      };
    }
  }
};

module.exports = {
  resolvers
}