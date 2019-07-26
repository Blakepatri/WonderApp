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

const xinc = new Sequelize('xinc', 'xinc', 'password', {
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

const yinc = new Sequelize('yinc', 'yinc', 'password', {
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

const zinc = new Sequelize('zinc', 'zinc', 'password', {
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

const orderTransaction = async (company, order) => {
  let Inventory, Part, StockLevel, Warehouse
  if (company === 'xinc') {
    Inventory = InventoryModel(xinc, Sequelize)
    Part = PartModel(xinc, Sequelize)
    StockLevel = StockLevelModel(xinc, Sequelize)
    Warehouse = WarehouseModel(xinc, Sequelize)
  } else if (company === 'yinc') {
    Inventory = InventoryModel(yinc, Sequelize)
    Part = PartModel(yinc, Sequelize)
    StockLevel = StockLevelModel(yinc, Sequelize)
    Warehouse = WarehouseModel(yinc, Sequelize)
  } else if (company === 'zinc') {
    Inventory = InventoryModel(zinc, Sequelize)
    Part = PartModel(zinc, Sequelize)
    StockLevel = StockLevelModel(zinc, Sequelize)
    Warehouse = WarehouseModel(zinc, Sequelize)
  }
  const result = await Part.findAll()

  return result
}

module.exports = {
  orderTransaction
}