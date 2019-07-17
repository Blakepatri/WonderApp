module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stock_level', {
    war_name: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'warehouse',
        key: 'war_name'
      }
    },
    par_id: {
      type: DataTypes.STRING(7),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'part',
        key: 'par_id'
      }
    },
    sto_minimum: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'stock_level'
  });
};
