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

module.exports.getAuthor = ({ id }) => {
  const params = {
    Key: {
      id
    },
    TableName: AUTHORS_TABLE_NAME
  };
  return dynamo.get(params).promise().then(result => result.Item);
};

module.exports.getBook = ({ id }) => {
  const params = {
    Key: {
      id
    },
    TableName: BOOKS_TABLE_NAME
  };
  return dynamo.get(params).promise().then(result => result.Item);
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