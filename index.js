import cors from 'cors'
import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import routes from './routes/products.js'

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/p', routes, haltOnTimedout)

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}

app.get('/', (req, res) => {
  res.send('Hello to E-Commerce API!')
})

const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));