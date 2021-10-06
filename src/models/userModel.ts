import * as Mongoose from 'mongoose'

export interface userModelType extends Mongoose.Document {
  _id: string,
  name: string,
  email: string,
  password: string,
}

const userSchema = new Mongoose.Schema<userModelType>({
  name: String,
  email: String,
  password: String,
})

export default Mongoose.model('User', userSchema);