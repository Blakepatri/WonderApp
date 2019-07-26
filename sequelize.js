const Sequelize = require('sequelize')
const InventoryModel = require('./models/inventory')
const PartModel = require('./models/part')
const StockLevelModel = require('./models/stock_level')
const WarehouseModel = require('./models/warehouse')

const sequelize = new Sequelize('store', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false,
    freezeTableName: true
  },
})

const xinc = new Sequelize('store', 'xinc', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false,
    freezeTableName: true
  },
})

const yinc = new Sequelize('store', 'yinc', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false,
    freezeTableName: true
  },
})

const zinc = new Sequelize('store', 'zinc', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false,
    freezeTableName: true
  },
})
const InventoryXinc = InventoryModel(xinc, Sequelize)
const PartXinc = PartModel(xinc, Sequelize)
const StockLevelXinc = StockLevelModel(xinc, Sequelize)
const WarehouseXinc = WarehouseModel(xinc, Sequelize)

const InventoryYinc = InventoryModel(yinc, Sequelize)
const PartYinc = PartModel(yinc, Sequelize)
const StockLevelYinc = StockLevelModel(yinc, Sequelize)
const WarehouseYinc = WarehouseModel(yinc, Sequelize)

const InventoryZinc = InventoryModel(zinc, Sequelize)
const PartZinc = PartModel(zinc, Sequelize)
const StockLevelZinc = StockLevelModel(zinc, Sequelize)
const WarehouseZinc = WarehouseModel(zinc, Sequelize)

const force = false //Used to wipe db on start

sequelize.sync({force}).then(() => {
  console.log('Db and tables created')
})

const orderTransaction = async (order) => {
  const xResult = await PartXinc.findAll()
  let yResult = await PartYinc.findAll()
  let zResult = await PartZinc.findAll()

  return {xResult, yResult, zResult}
  /*return sequelize.transaction().then((t) => {
    const ids = []
    for (let i = 0; i < order.parts.length; i++) {
      ids.push(order.parts[i].partNumber) 
    }
    return Part
  })*/
}

module.exports = {
  orderTransaction
}