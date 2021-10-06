import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'
import mutationType from './mutations'
import queryType from './query'

export const schema = new GraphQLSchema({
  mutation: mutationType,
  query: queryType
});