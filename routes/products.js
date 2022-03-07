import express from 'express'
import { createProduct, getProducts, getSneakers, getJackets, getAccessories,
updateProducts, deleteProduct, getProduct, randomAccessory, randomJacket,
randomSneaker, randomProduct } from '../controllers/product.js'
import { registerUser, loginUser, findUser, updateUser, deleteUserById,
getUserOrders } from '../controllers/users.js'
import { createOrder,  getOrder } from '../controllers/order.js'
import timeout from 'connect-timeout'

const router = express.Router()

router.post('/createProduct', timeout('5s'), createProduct)
router.get('/products', timeout('5s'), getProducts)
router.get('/product/detail/:id', timeout('5s'), getProduct)
router.get('/products/sneakers', timeout('5s'), getSneakers)
router.get('/products/jackets', timeout('5s'), getJackets)
router.get('/products/random', timeout('5s'), randomProduct)
router.get('/products/random/accessory', timeout('5s'), randomAccessory)
router.get('/products/random/jacket', timeout('5s'), randomJacket)
router.get('/products/random/sneaker', timeout('5s'), randomSneaker)
router.get('/products/accessories', timeout('5s'), getAccessories)
router.patch('/products/:id/update', timeout('5s'), updateProducts)
router.delete('/products/:id/delete', timeout('5s'), deleteProduct)

router.post('/createUser', registerUser)
router.post('/loginUser', loginUser)
router.get('/findUser/:id', findUser)
router.get('/user/orders/:id', getUserOrders)
router.patch('/update/:id', updateUser)
router.delete('/user/:id', deleteUserById)

router.post('/createOrder', createOrder)
router.get('/orders/:id', getOrder)

export default router