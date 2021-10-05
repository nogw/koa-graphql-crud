import graphql from 'graphql'

const { GraphQLObjectType, GraphQLString } = graphql

const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  })
})

export default {
  userType
}