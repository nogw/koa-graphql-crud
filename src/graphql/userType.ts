import { GraphQLObjectType, GraphQLString } from 'graphql'

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'User type',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  })
})

export default {
  userType
}