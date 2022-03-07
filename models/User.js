import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: { 
    type: String,
    required: true, 
    unique: true
  },
  email: String,
  password: { 
    type: String,
    required: true 
  },
  token: String,
  role: {
    type: 'String',
    required: true,
    enum: ['User', 'Admin']
  }
})

const User = mongoose.model('User', userSchema)

export default User