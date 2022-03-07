import Order from '../models/Order.js'

export const createOrder = async (req, res) => {
  const { firstName, lastName, address, zipCode, city, apartment, products,
   country, region, phone, userId, total, cardNumber, cardType, cardType2, shipping } = req.body

  const newOrder = await Order.create({ firstName, lastName, address, zipCode, 
   city, apartment, products, country, region, phone, userId, total, cardNumber, 
   cardType, cardType2, shipping })

  try {
    await newOrder.save()

    res.status(200).json(newOrder)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getOrder = async (req, res) => {
  const { id } = req.params

  try {
    const order = await Order.findById(id)
    
    res.status(200).json(order)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
