/* /controllers/movie.js */

const graphqlHTTP = require('koa-graphql');
// const MovieSchema = require('../graphql/schema-old');
const MovieSchema = require('../graphql/schema');

// GraphQL 类型处理函数
const Movie = require('../mongodb/models/movie.js');
const root = {
  getAllMovie: async () => {
    return Movie.find({});
  }
}

const graphqlMovie = graphqlHTTP({
  schema: MovieSchema,
  // rootValue: root,
  graphiql: true
});

module.exports = {
  graphqlMovie,
};