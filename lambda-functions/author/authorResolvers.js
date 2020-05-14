const { createAuthor, getAuthor, updateAuthor, listAuthors } = require('./authorApi');
const { getBooks } = require('./../book/bookApi');

// The resolvers
resolvers = {
  Query: {
    authors: (_, { nextToken, limit }) => listAuthors({ nextToken, limit }),
    author: (_, { id }) => getAuthor({ id })
  },
  Author: {
    books: (parent) => getBooks({ ids: parent.books })
  },
  Mutation: {
    addAuthor: (_, { name, books = [] }) => {
      const addedAuthor = createAuthor({ name, books });
      return {
        success: true,
        message: "well done",
        author: addedAuthor
      };
    },
    updateAuthor: (_, { id, name, books }) => {
      const addedAuthor = updateAuthor({ id, name, books });
      return {
        success: true,
        message: "well done",
        author: addedAuthor
      };
    }
  }
};

module.exports = {
  resolvers
}