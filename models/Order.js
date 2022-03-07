import mongoose from 'mongoose'

const OrderSchema = mongoose.Schema({
   userId: { type: String, required: true },
   firstName: { type: String, required: true },
   lastName: { type: String, required: true },
   address: { type: String, required: true },
   apartment: { type: String },
   Phone: { type: String },
   city: { type: String, required: true },
   country: { type: String, required: true },
   region: { type: String, required: true },
   zipCode: { type: String, required: true },
   products: [],
   cardType: { type: String, required: true },
   cardType2: { type: String, required: true },
   cardNumber: { type: String, required: true },
   total: { type: Number, required: true },
   shipping: { type: Number, required: true },
}, { timestamps: true })

const Order = mongoose.model('Order', OrderSchema)

export default Order