import mongoose from 'mongoose'

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: [],
  category: {
    type: String,
    required: true, 
    enum: ['Sneakers', 'Accessories', 'Jackets']
  },
  description: { 
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})

const Product = mongoose.model('Product', ProductSchema)

export default Product