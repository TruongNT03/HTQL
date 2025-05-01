import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import db from "../models/index.js";

const register = async (req, res) => {
  const { username, password, fullname } = req.body;
  const user = await db.users.findOne({
    where: {
      username: username,
    },
  });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = await db.users.create({
    username,
    fullname,
    password: hashedPassword,
  });

  return res.status(201).json({
    message: "Đăng ký thành công!",
    data: {
      fullname: newUser.fullname,
      role: newUser.role,
      username: newUser.username,
    },
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await db.users.findOne({
    where: {
      username,
    },
  });
  if (!user) {
    return res
      .status(401)
      .json({ message: "Tài khoản mật khẩu không chính xác!" });
  }
  const comparePass = await bcrypt.compare(password, user.password);
  if (!comparePass) {
    return res
      .status(401)
      .json({ message: "Tài khoản mật khẩu không chính xác!" });
  }
  const token = jwt.sign(
    {
      id: user.id,
      fullname: user.fullname,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY
  );
  return res.status(200).json({
    message: "Đăng nhập thành công.",
    data: {
      fullname: user.fullname,
      role: user.role,
      username: user.username,
    },
    token,
  });
};

const updateUser = async (req, res) => {
  const { id, role, team_id } = req.body;
  const user = await db.users.findByPk(id);
  if (!user) {
    return res.status(401).json({ message: "Không tồn tại user!" });
  }
  await user.update({ role, team_id });
  return res.status(200).json({ message: "Cập nhập thành công!" });
};

export { register, login, updateUser };
