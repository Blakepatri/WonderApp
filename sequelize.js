const Sequelize = require('sequelize')

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

const force = false //Used to wipe db on start

sequelize.sync({force}).then(() => {
  console.log('Db and tables created')
})