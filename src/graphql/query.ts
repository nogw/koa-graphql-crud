import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'
import userType from './user/userType'
import userModel from '../models/userModel'

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    UserQuery: {
      type: userType.userType,
      args: { id: { type: GraphQLString } },
      resolve(_, args) { return userModel.findById(args.id) },
    },
  },
})

export default queryType