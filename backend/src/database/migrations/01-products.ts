import { QueryInterface, DataTypes } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('products', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      product_image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      seller_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('products');
  }
};
