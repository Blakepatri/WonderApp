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
app.use(cors(corsOptions))

app.use(bodyParser.json())

app.listen(process.argv[2] === 'xinc' ? 8000 : process.argv[2] === 'yinc' ? 8001 : process.argv[2] === 'zinc' ? 8002 : 8000 , () => {
  console.log(process.argv[2] === 'xinc' ? 8000 : process.argv[2] === 'yinc' ? 8001 : process.argv[2] === 'zinc' ? 8002 : 8000)
  console.log('Server started!')
})

app.route('/api/order').post(async (req, res) => {
  try {
    console.log(req.body)
    const company = process.argv[2]
    const order = req.body
    const parts = []
    if (!order.orderNumber || !order.companyName || !order.numberOfParts || order.parts.length === 0) {
      res.json({status: 'fail'})
    } else { 
      for (let i = 0; i < order.parts.length; i++) {
        if (order.parts[i].companyName.toLowerCase() === company) {
          parts.push(order.parts[i])
        }
      }
      if (parts.length > 0) {
        const result = await sequelize.orderTransaction(company, parts, order.orderNumber)
        if (result) {
          res.json({status: 'success', result})
        } else {
          res.json({status: 'fail'})
        }
      } else {
        res.json({status: 'success'})
      }
    }
  } catch (err) {
    res.json({status: 'fail'})
  }
})

app.route('/api/commit').post(async (req, res) => {
  try {
    await sequelize.commitTransaction(req.body.xid)
    res.json({status: 'success'})
  } catch (err) {
    res.json({status: 'fail'})
  }
})

app.route('/api/rollback').post(async (req, res) => {
  try {
    await sequelize.rollbackTransaction(req.body.xid)
    res.json({status: 'success'})
  } catch (err) {
    res.json({status: 'fail'})
  }
})
