import express from 'express'
import { registerUser, loginUser, findUser, updateUser, deleteUserById,
getUserOrders } from '../controllers/users.js'

const router = express.Router()

router.post('/createUser', registerUser)
router.post('/loginUser', loginUser)
router.get('/findUser/:id', findUser)
router.get('/user/orders/:id', getUserOrders)
router.patch('/update/:id', updateUser)
router.delete('/user/:id', deleteUserById)

export default router