import express from 'express'
import { createProduct, getProducts, getSneakers, getJackets, getAccessories,
updateProducts, deleteProduct, getProduct, randomAccessory, randomJacket,
randomSneaker, randomProduct } from '../controllers/product.js'

const router = express.Router()

router.post('/createProduct', createProduct)
router.get('/products', getProducts)
router.get('/product/detail/:id', getProduct)
router.get('/products/sneakers', getSneakers)
router.get('/products/jackets', getJackets)
router.get('/products/random', randomProduct)
router.get('/products/random/accessory', randomAccessory)
router.get('/products/random/jacket', randomJacket)
router.get('/products/random/sneaker', randomSneaker)
router.get('/products/accessories', getAccessories)
router.patch('/products/:id/update', updateProducts)
router.delete('/products/:id/delete', deleteProduct)

export default router