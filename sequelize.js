const Sequelize = require('sequelize')
const InventoryModel = require('./models/inventory')
const PartModel = require('./models/part')
const StockLevelModel = require('./models/stock_level')
const WarehouseModel = require('./models/warehouse')

const sequelize = new Sequelize('sharkinc', 'root', 'password', {
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

const orderTransaction = async (company, order, orderNumber) => {
  let xid
  try {
    if (company === 'xinc') db = xinc
    else if (company === 'yinc') db = yinc
    else if (company === 'zinc') db = zinc

    const Inventory = InventoryModel(db, Sequelize)
    const Part = PartModel(db, Sequelize)
    const StockLevel = StockLevelModel(db, Sequelize)
    const Warehouse = WarehouseModel(db, Sequelize)

    Part.hasMany(StockLevel)
    Part.hasMany(Inventory)
    Warehouse.hasMany(Inventory)
    Warehouse.hasMany(StockLevel)

    xid = company + orderNumber + Math.floor((Math.random() * 10000) + 1)
    await db.query(`XA START "${xid}"`)
    console.log(order)
    for(let i = 0; i < order.length; i++) {
      let result = await db.query(`SELECT * FROM warehouse INNER JOIN inventory ON warehouse.war_name = inventory.war_name AND inventory.par_id = "${order[i].partNumber}" 
        INNER JOIN stock_level ON warehouse.war_name = stock_level.war_name AND stock_level.par_id = "${order[i].partNumber}";`)
      result = JSON.parse(JSON.stringify(result[0]))
      let highestStock = 0
      let warehouseToUse
      let combinedStock = 0
      const warehouseStock = []
      for (let index = 0; index < result.length; index++) {
        if (result[index].sto_minimum < (result[index].inv_quantity - order[i].quantity) && result[index].inv_quantity > highestStock) {
          highestStock = result[index].inv_quantity
          warehouseToUse = index
        } else if (result[index].inv_quantity > result[index].sto_minimum) {
          combinedStock += result[index].inv_quantity - result[index].sto_minimum
          warehouseStock.push({
            warehouse: result[index].war_name,
            stockToUse: result[index].inv_quantity - result[index].sto_minimum
          })
        }
      }
      if (highestStock === 0 && !warehouseToUse) {
        if (combinedStock >= order[i].quantity) {
          for (let x = 0; x < warehouseStock.length; x++) {
            let stockToUse
            if (combinedStock >= warehouseStock[x].stockToUse) {
             combinedStock -= warehouseStock[x].stockToUse
             db.query(`UPDATE inventory SET inv_quantity = inv_quantity - ${warehouseStock[x].stockToUse} 
               WHERE par_id = "${order[i].partNumber}" AND war_name = "${warehouseStock[x].warehouse}"`)
            } else if (combinedStock > 0) {
              db.query(`UPDATE inventory SET inv_quantity = inv_quantity - ${combinedStock} 
               WHERE par_id = "${order[i].partNumber}" AND war_name = "${warehouseStock[x].warehouse}"`)
            }
          }
        } else {
          throw new Error('Not enought stock')
        }
      } else {
        await db.query(`UPDATE inventory SET inv_quantity = inv_quantity - ${order[i].quantity}
          WHERE par_id = "${order[i].partNumber}" AND war_name = "${result[warehouseToUse].war_name}"`)
      }
    }
    await db.query(`XA END "${xid}"`)
    await db.query(`XA PREPARE "${xid}"`)
    return xid
  } catch (err) {
    await db.query(`XA ROLLBACK "${xid}"`)
    return false
  }
}

const commitTransaction = async (xid) => {
  await db.query(`XA COMMIT "${xid}"`)
}

const rollbackTransaction = async (xid) => {
  await db.query(`XA ROLLBACK "${xid}"`)
}

module.exports = {
  orderTransaction,
  commitTransaction,
  rollbackTransaction
}