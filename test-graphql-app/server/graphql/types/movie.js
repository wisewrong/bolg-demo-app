/* /graphql/types/movies.js - 定义 Movie 类型 */
const graphql = require('graphql');

const { 
  GraphQLObjectType, 
  GraphQLList, 
  GraphQLString, 
  GraphQLInt,
} = graphql;

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    _id: { type: GraphQLString }, // String
    name: { type: GraphQLString }, 
    years: { type: GraphQLInt },  // Int
    poster: { type: GraphQLString },
    director: { type: GraphQLString },
    category: { type: new GraphQLList(GraphQLString) }, // [String]
  })
});

module.exports = MovieType;
