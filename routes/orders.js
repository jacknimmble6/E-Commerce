import express from 'express'
import { createOrder,  getOrder } from '../controllers/order.js'

const router = express.Router()

router.post('/createOrder', createOrder)
router.get('/orders/:id', getOrder)

export default router