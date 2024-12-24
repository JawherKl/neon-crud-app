'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Define associations here if necessary
    }
  }
  Order.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true, // Marking id as primary key
        allowNull: false,
      },
      customer_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'Orders', // Ensures consistency with table naming
    }
  );
  return Order;
};
