module.exports = function(sequelize, DataTypes) {
  return sequelize.define('warehouse', {
    war_name: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: true
    },
    war_location: {
      type: DataTypes.STRING(16),
      allowNull: false
    }
  }, {
    tableName: 'warehouse'
  });
};
