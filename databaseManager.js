'use strict';

const AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:15001',
  accessKeyId: 'DEFAULT_ACCESS_KEY', // needed if you don't have aws credentials at all in env
  secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
});

const BOOKS_TABLE_NAME = process.env.BOOKS_TABLE;
const AUTHORS_TABLE_NAME = process.env.AUTHORS_TABLE;

module.exports.initializateDynamoClient = newDynamo => {
  dynamo = newDynamo;
};

module.exports.getBook = () => {
  const params = {
    Key: {
      bookId: "1"
    },
    TableName: BOOKS_TABLE_NAME
  };

  console.log("result item");
  return dynamo.get(params).promise().then(result => {
    console.log("result item");
    return result.Item;
  });
};

module.exports.getAuthor = (authorId) => {
  const params = {
    Key: {
      authorId
    },
    TableName: AUTHORS_TABLE_NAME
  };

  return dynamo.get(params).promise().then(result => {
    const author = result.Item;

    return author;
  });
};

module.exports.getBook = (bookId) => {
  const params = {
    Key: {
      bookId
    },
    TableName: BOOKS_TABLE_NAME
  };

  return dynamo.get(params).promise().then(result => {
    const book = result.Item;
    book.authors = book.authors.map(authorId => this.getAuthor(authorId));
    return book;
  });
};

module.exports.getBooks = () => {
  const params = {
    TableName: BOOKS_TABLE_NAME
  };

  return dynamo.scan(params, (err, data) => {
    if (err) {
      console.log("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Got data:", JSON.stringify(data));
      return data;
    }
  }).promise().then(res => res.Items);
};