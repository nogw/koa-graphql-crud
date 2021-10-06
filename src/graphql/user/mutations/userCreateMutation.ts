import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId, } from 'graphql-relay'
import { hash } from 'bcryptjs'
import { sign } from "jsonwebtoken";
import User from '../../../models/userModel'

export default mutationWithClientMutationId({
  name: "CreateUser",
  description: "create user mutation",
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    token: { type: GraphQLString, resolve: ({ token }) => token },
    error: { type: GraphQLString, resolve: ({ error }) => error }
  },
  mutateAndGetPayload: async ({ name, email, password }) => {
    const userExists = await User.findOne({ email })

    if (userExists) {
      return {
        token: null,
        error: "User already registered"
      }
    }

    const hashedPassword = await hash(password, 10)

    const user = new User({
      name: name,
      email: email,
      password: hashedPassword
    })

    await user.save()

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