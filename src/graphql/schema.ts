import { buildSchema } from 'graphql'
import {GraphQLSchema, GraphQLObjectType, GraphQLString} from 'graphql'
import userType from './userType'
import userModel from '../models/user.model'

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const rootQuery = new GraphQLObjectType({
  name: "User",
  fields: {
    user: {
      type: userType.userType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return userModel.findById(args.id)
      },
    },
  },
})

export default new GraphQLSchema({ query: rootQuery })