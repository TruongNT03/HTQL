import { DataTypes, Model } from "sequelize";

import sequelize from "../dbConnect.js";

class products extends Model {}

products.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    class: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    tableName: "products",
  }
);

export default products;
