module.exports = function(sequelize, DataTypes) {
  return sequelize.define('part', {
    par_id: {
      type: DataTypes.STRING(7),
      allowNull: false,
      primaryKey: true
    },
    par_name: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    par_weight: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'part'
  });
};
