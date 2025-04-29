import db from "../models/index.js";

const login = async (req, res) => {
  const new_user = await db.users.create({
    username: "admin",
    password: "admin",
  });
  return res.status(200).json(new_user);
};

export { login };
