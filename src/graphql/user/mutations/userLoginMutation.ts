import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { compare } from 'bcryptjs'
import User, { userModelType } from '../../../models/userModel'
import { sign } from 'jsonwebtoken'

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
    const user = await User.findOne({ email })

    if (!user) {
      return {
        token: null,
        error: "User not found"
      }
    }

    const result = await compare(password, user.password)

    if (!result) {
      return {
        token: null,
        error: "Passwords not match"
      }
    }

    const token = sign({}, process.env.JWT_TOKEN, {
      subject: user._id.toString(),
      expiresIn: "1 day"
    })

    return {
      token: token,
      error: null
    }
  }
})