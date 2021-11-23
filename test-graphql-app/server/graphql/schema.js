/* /graphql/schema.js - 构建类型 */

const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const queryFields = require('./query/movie.js');
const mutationFields = require('./mutation/movie.js');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: queryFields,
});

const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: mutationFields,
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
