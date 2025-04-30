import { DataTypes, Model } from "sequelize";

import sequelize from "../dbConnect.js";

class users extends Model {}

users.init(
  {
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    fullname: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    team_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "users",
  }
);

export default users;
