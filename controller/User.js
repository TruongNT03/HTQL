import bcrypt from "bcrypt";
import db from "../models/index.js";


const register = async (req, res) => {
    console.log(req.body);
    const user = await db.users.findOne({
        where: {
          username: req.body.username,
        },
      });
    if (user) {
        return res.status(400).json({ message: "Username already exists" });
      }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await db.users.create({
        ...req.body,
        password: hashedPassword,
    });

    res.status(201).json({
        message: "Đăng ký thành công!",
        data: {
          fullname: newUser.fullname,
          role: newUser.role,
          username: newUser.username,
        },
      });
}

const login = async (req, res) => {
    console.log(req.body);
    const user = await db.users.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
        console.log(user);
      const comparePass = bcrypt.compare(req.body.password, user.password);
      if (!comparePass) {
        return res.status(401).json({
          message: "Tài khoản hoặc mật khẩu không chính xác.",
        });
      }

      return res.status(200).json({
        message: "Đăng nhập thành công.",
        data: {
            fullname: user.fullname,
            role: user.role,
            username: user.username,
          },
      });
    }
    else
    {
        return res.status(401).json({
          message: "dang nhap that bai",
        });
    }
  };



export { register, login };