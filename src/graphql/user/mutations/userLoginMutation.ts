import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { compare } from 'bcryptjs'
import User, { userModelType } from '../../../models/userModel'

export default mutationWithClientMutationId({
  name: "UserLogin",
  description: "login user mutation",
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    token: { type: GraphQLString, resolve: ({ token }) => token},
    error: { type: GraphQLString, resolve: ({ error }) => error}
  },
  mutateAndGetPayload: async ({ email, password }) => {
    const userExists = await User.findOne({ email })

    if (!userExists) {
      return {
        token: null,
        error: "User not found"
      }
    }

    const result = await compare(password, userExists.password)

    if (!result) {
      return {
        token: null,
        error: "Passwords not match"
      }
    }

    return {
      token: result,
      error: null
    }
  }
})