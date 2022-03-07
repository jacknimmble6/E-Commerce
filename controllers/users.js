import mongoose from 'mongoose'
import User from '../models/User.js'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Order from '../models/Order.js'

dotenv.config()

const secret = '345t6rw4'

export const registerUser = async (req, res) => {
  const { email, username, password, firstName, lastName, role } = req.body
  
  try {
    const oldUser = await User.findOne({ username });
  
    if (oldUser) return res.status(400).json({ message: "User already exists" })

    const salt = await bcrypt.genSalt(10)
  
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const result = await User.create({ email, password: hashedPassword, username, 
      firstName, lastName, role: role || 'User'  })
  
    const token = jwt.sign({ username: result.username, id: result._id }, secret, { expiresIn: "1h" })
  
    res.status(201).json({ result, token })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
      
    console.log(error);
  }
}
 
export const loginUser = async (req, res) => {
  const { username, password, email, adminNumber, role } = req.body;
  
  try {
    const oldUser = await User.findOne({ username, email })
  
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" })

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)
  
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" })
  
    const token = jwt.sign({ username: oldUser.username, id: oldUser._id }, secret, { expiresIn: "1h" })
  
    if (role === 'Admin' && adminNumber !== process.env.ADMIN_SECRET_NUMBER) 
    return res.status(400).json({ message: 'Cannot log into admin'})

    res.status(200).json({ oldUser, token })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" })
  }
}

export const findUser = async (req, res) => {
  const { id } = req.params
  
  try {
    const user = await User.findById(id)
      
     res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params
  const { username, password, email, firstName, lastName} = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No expense with id: ${id}`)

  const updatedUser = { username, password, email, firstName, lastName, _id: id } 

  await User.findByIdAndUpdate(id, updatedUser, { new: true })

  res.json(updatedUser)
}

export const deleteUserById = async (req, res) => {
  const { id } = req.params

  await User.findByIdAndRemove(id)

  res.json({ message: 'User deleted successfully.' })
}

export const getUserOrders = async (req, res) => {
  const { id } = req.params

  try {
    const orders = await Order.find({ userId: id })
    
    res.status(200).json(orders)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
} 
