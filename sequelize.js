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
let db

sequelize.sync({force}).then(() => {
  console.log('Db and tables created')
})

const orderTransaction = async (company, order) => {
  let xid
  try {
    if (company === 'xinc') db = xinc
    else if (company === 'yinc') db = yinc
    else if (company === 'zinc') db = zinc

    const Inventory = InventoryModel(db, Sequelize)
    const Part = PartModel(db, Sequelize)
    const StockLevel = StockLevelModel(db, Sequelize)
    const Warehouse = WarehouseModel(db, Sequelize)

    xid = company + order.orderNumber + Math.floor((Math.random() * 10000) + 1)
    await db.query(`XA START "${xid}"`)
    // Placeholder, should have our transaction happen here
    await Part.create({par_id: 'ISO-ggg', par_name: 'D', par_weight: 2})
    await db.query(`XA END "${xid}"`)
    await db.query(`XA PREPARE "${xid}"`)
    return xid
  } catch (err) {
    await db.query(`XA ROLLBACK "${xid}"`)
    return err
  }
}

const commitTransaction = async (xid) => {
  db.query(`XA COMMIT "${xid}"`)
}

module.exports = {
  orderTransaction,
  commitTransaction
}