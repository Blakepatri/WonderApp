const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')

const sequelize = require('./sequelize')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password'
})

const app = express()
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(bodyParser.json())
app.use(cors(corsOptions))

app.listen(8000, () => {
  console.log('Server started!')
})

app.route('/api/order').post(async (req, res) => {
  try {
    // const order = req.body
    // if (!order.orderNumber || !order.companyName || !order.numberOfParts || order.parts.length === 0) {
    //   res.json({status: 'fail'})
    // } else {
     const result = await sequelize.orderTransaction('')
     res.json({status: 'success', result})
   // }
  } catch (err) {
    console.log(err)
  }
})
