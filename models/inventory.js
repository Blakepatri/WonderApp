module.exports = function(sequelize, DataTypes) {
  return sequelize.define('inventory', {
    par_id: {
      type: DataTypes.STRING(7),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'part',
        key: 'par_id'
      }
    },
    war_name: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'warehouse',
        key: 'war_name'
      }
    },
    inv_quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'inventory'
  });
};
