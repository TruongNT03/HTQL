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

const getAllUsers = async (req, res) => {
  console.log(req.body);
  let { page = 1, sortBy = "id", sortOrder = "ASC" } = req.body;
  page = page === "" || isNaN(page) ? 1 : Number.parseInt(page);
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  try {
    const users = await db.users.findAll({
      attributes: ["id", "username", "fullname", "role"],
      order: [[sortBy, sortOrder.toUpperCase()]],
      limit: pageSize,
      offset: offset,
    });

    return res.status(200).json({ 
      message: "Thành công", 
      data: users, 
      pagination: { page, pageSize }
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi khi lấy danh sách users", error });
  }
};



export { register, login, updateUser, getAllUsers };
