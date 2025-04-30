import db from "../models/index.js";

const insertDistributor = async (req, res) => {
  const { name } = req.body;
  let existDistributor = await db.distributors.findOne({
    name,
  });
  if (!existDistributor) {
    existDistributor = db.distributors.create({
      name: name,
    });
  }
  return res
    .status(201)
    .json({ message: "Tạo mới thành công", data: existDistributor });
};

export { insertDistributor };
