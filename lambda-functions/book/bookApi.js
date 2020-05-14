const { v4: uuid } = require('uuid');
const moment = require('moment');
const { insertOrReplace, find, getWhereIdIn, update, list } = require('../dynamoService');

const { BOOKS_TABLE } = process.env;

const createBook = async(args) => {
  console.log("getBooks", { args });
  const dateNowStr = moment().format();

  const newBook = {
    id: uuid(),
    ...args,
    createdAt: dateNowStr,
    updatedAt: dateNowStr
  };

  const book = await insertOrReplace(newBook, BOOKS_TABLE);

  return book;
};

const getBook = async(args) => {
  console.log("getBook", { args });
  const id = args.id;
  const book = await find(id, BOOKS_TABLE);

  return book;
};

const getBooks = async(args) => {
  console.log("getBooks", { args });
  const books = await getWhereIdIn(args.ids, BOOKS_TABLE);

  return books;
};

const updateBook = async(args) => {
  console.log("getBooks", { args });
  const dateNowStr = moment().format();
  const bookId = args.id;

  const updatedBook = {
    ...args,
    updatedAt: dateNowStr
  };

  // We remove ID from fields to update
  delete updatedBook.id;

  await update({
    id: bookId,
    data: updatedBook,
    tableName: BOOKS_TABLE
  });

  // We add ID to return updated object.
  updatedBook.id = bookId;

  return updatedBook;
};

const deleteBook = async(args) => {
  console.log("deleteBook", { args });
  return {};
}

const listBooks = async(args) => {
  console.log("listBooks", { args });
  const bookListResponse = await list({
    limit: args.limit,
    nextToken: args.nextToken,
    tableName: BOOKS_TABLE
  });

  return bookListResponse;
};

module.exports = {
  createBook,
  getBook,
  getBooks,
  updateBook,
  deleteBook,
  listBooks
};