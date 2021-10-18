import { GraphQLObjectType } from 'graphql'
import mutationUser from './user'

const mutationType = new GraphQLObjectType({
  name: "UserMutation",
  description: "root of all mutations",
  fields: () => ({
    ...mutationUser
  })
}) 

export default mutationType