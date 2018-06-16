'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tree = sequelize.define('Tree', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    branches: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    minLeaves: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    maxLeaves: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Tree.associate = function(models) {
    // Parent of Branch Table
    Tree.hasMany(models.Branch, {
      targetKey: "treeId",
      onDelete: "CASCADE"
    });
  };
  return Tree;
};