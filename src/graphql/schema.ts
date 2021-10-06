import { buildSchema } from 'graphql'
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'
import userType from './userType'
import userModel from '../models/user.model'

const rootQuery = new GraphQLObjectType({
  name: "UserQueryType",
  fields: {
    user: {
      type: userType.userType,
      args: { id: { type: GraphQLString } },
      resolve(_, args) {
        return userModel.findById(args.id)
      },
    },
  },
})

export default new GraphQLSchema({ query: rootQuery })