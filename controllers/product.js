import Product from "../models/Product.js";
import mongoose from 'mongoose'

export const createProduct = async (req, res) => {
  const { name, price, category, amount, description, images } = req.body

  const newProduct = await Product.create({ name, price, category, amount, description, images })

  try {
    await newProduct.save()

    res.status(200).json(newProduct)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getProducts = async (req, res) => {
  const { sort, search } = req.query

  const name = new RegExp(search, 'i')  

  try {
   
    const products = await Product.find({ $or: [ { name } ] })

    res.status(200).json(products)

  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const getProduct = async (req, res) => {
  const { id } = req.params

  try {
    const product = await Product.findById(id)
    
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getSneakers = async (req, res) => {
  try {
    const products = await Product.find({ category: 'Sneakers' }).limit(6)

    res.status(200).json(products)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}
export const getJackets = async (req, res) => {
  try {
    const products = await Product.find({ category: 'Jackets' })

    res.status(200).json(products)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}
export const getAccessories = async (req, res) => {
  try {
    const products = await Product.find({ category: 'Accessories' }).limit(6)

    res.status(200).json(products)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updateProducts = async (req, res) => {
  const { id } = req.params
  const { name, price, category, amount, description, images } = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`)

  const updatedProduct = { name, price, category, amount, description, images, _id: id }

  await Product.findByIdAndUpdate(id, updatedProduct, { new: true })

  res.json(updatedProduct)
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params

  await Product.findByIdAndRemove(id)

  res.json({ message: 'Product deleted successfully.' })
}

export const randomSneaker = async (req, res) => {
  try {
    const random = await Product.aggregate([
      {
        '$match': {
          'category': 'Sneakers'
        }
      }, {
        '$sample': {
          'size': 3
        }
      }
    ])

    res.status(200).json(random)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const randomJacket = async (req, res) => {
  try {
    const random = await Product.aggregate([
      {
        '$match': {
          'category': 'Jackets'
        }
      }, {
        '$sample': {
          'size': 3
        }
      }
    ])

    res.status(200).json(random)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const randomProduct = async (req, res) => {
  try {
    const random = await Product.aggregate([
     {
       '$sample': {
         'size': 1
        }
      }
    ])

    res.status(200).json(random)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const randomAccessory = async (req, res) => {
  try {
    const random = await Product.aggregate([
      {
        '$match': {
          'category': 'Accessories'
        }
      }, {
        '$sample': {
          'size': 3
        }
      }
    ])

    res.status(200).json(random)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

