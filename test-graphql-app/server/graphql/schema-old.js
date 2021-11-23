/* /graphql/schema.js - 使用 buildSchema 创建的 GraphQL Schema */

const { buildSchema } = require('graphql');

const Schema = buildSchema(`
  type Query {
    getAllMovie: [Movie]
  }
  type Movie {
    _id: String,
    name: String,
    years: String,
    director: String,
  }
`)

module.exports = Schema;