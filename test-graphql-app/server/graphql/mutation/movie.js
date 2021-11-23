/* /graphql/mutation/movies.js - 定义增删改操作 */

const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} = require("graphql");
const movieGraphQLType = require("../types/movie.js");
const Movie = require("../../mongodb/models/movie.js");

// 新建电影
const createMovie = (req) => {
  delete req._id;
  return Movie.create(req);
};

// 更新电影信息
const updateMovie = (req) => {
  return Movie.findByIdAndUpdate(req._id, req, {
    new: true,
  });
};

// 保存电影
const saveMovie = {
  type: movieGraphQLType,
  args: {
    // 用 GraphQLNonNull 来设置必填项
    name: { type: new GraphQLNonNull(GraphQLString) },
    _id: { type: GraphQLString }, // String
    years: { type: GraphQLInt }, // Int
    poster: { type: GraphQLString },
    director: { type: GraphQLString },
    category: { type: new GraphQLList(GraphQLString) }, // [String]
  },
  resolve(parent, args) {
    return args._id ? updateMovie(args) : createMovie(args);
  },
};

// 删除电影
const removeMovie = {
  type: movieGraphQLType,
  args: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parent, args) {
    return Movie.findByIdAndRemove(args._id);
  },
};

module.exports = {
  saveMovie,
  removeMovie
};
