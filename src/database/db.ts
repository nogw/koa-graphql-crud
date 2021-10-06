import * as Mongoose from 'mongoose'

const connect = async () => {
  const database_uri = process.env.DATABASE_URI
  await Mongoose.connect(database_uri)
}

export default {
  connect
}