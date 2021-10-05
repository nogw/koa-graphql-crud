import mongoose from 'mongoose'

const connect = async () => {
  const database_uri = process.env.DATABASE_URI
  await mongoose.connect(database_uri)
}

export default {
  connect
}