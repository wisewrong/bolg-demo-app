/* /graphql/query/movies.js - 定义 getAllMovie 字段 */

const { GraphQLList } =  require('graphql');
const movieGraphQLType = require('../types/movie.js');
const Movie = require('../../mongodb/models/movie.js');

const getAllMovie = {
  type: new GraphQLList(movieGraphQLType),
  args: {},
  resolve() {
    return Movie.find({})
  }
}

module.exports = {
  getAllMovie,
};
