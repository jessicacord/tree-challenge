'use strict';
module.exports = (sequelize, DataTypes) => {
  var Branch = sequelize.define('Branch', {
    leaves: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Branch.associate = function(models) {
    // Child of Tree Table
    Branch.belongsTo(models.Tree, {
      foreignKey: {
        allowNull: false,
        foreignKey: "treeId"
      }
    });
  };
  return Branch;
};