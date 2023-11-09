import { Model, DataTypes } from 'sequelize';
import config from './';

class Product extends Model {
  declare id: number;
  declare productName: string;
  declare price: number;
  declare description: string;
  declare productImage: string;
  declare sellerId: number;
}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  productName: {
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
  productImage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sellerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  sequelize: config,
  timestamps: false,
  tableName: 'products',
  underscored: true,
});

export default Product;
