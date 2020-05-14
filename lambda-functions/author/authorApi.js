const { v4: uuid } = require('uuid');
const moment = require('moment');
const { insertOrReplace, find, getWhereIdIn, update, list } = require('../dynamoService');

const { AUTHORS_TABLE } = process.env;

const createAuthor = async(args) => {
  console.log("createAuthor", args);

  const dateNowStr = moment().format();

  const newAuthor = {
    id: uuid(),
    ...args,
    createdAt: dateNowStr,
    updatedAt: dateNowStr
  };

  const author = await insertOrReplace(newAuthor, AUTHORS_TABLE);

  return author;
};

const getAuthor = async(args) => {
  console.log("getAuthor", args);

  const id = args.id;
  const author = await find(id, AUTHORS_TABLE);

  return author;
};

const getAuthors = async(args) => {
  console.log("getAuthors", args);
  const authors = await getWhereIdIn(args.ids, AUTHORS_TABLE);

  return authors;
};

const updateAuthor = async(args) => {
  console.log("updateAuthor", args);
  const dateNowStr = moment().format();
  const authorId = args.id;

  const updatedAuthor = {
    ...args,
    updatedAt: dateNowStr
  };

  // We remove ID from fields to update
  delete updatedAuthor.id;

  await update({
    id: authorId,
    data: updatedAuthor,
    tableName: AUTHORS_TABLE
  });

  // We add ID to return updated object.
  updatedAuthor.id = authorId;

  return updatedAuthor;
};

const deleteAuthor = async(args) => {
  console.log("deleteAuthor", { args });
  return {};
}

const listAuthors = async(args) => {
  const authorListResponse = await list({
    limit: args.limit,
    nextToken: args.nextToken,
    tableName: AUTHORS_TABLE
  });

  return authorListResponse;
};

module.exports = {
  createAuthor,
  getAuthor,
  getAuthors,
  updateAuthor,
  deleteAuthor,
  listAuthors
};