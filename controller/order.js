import db from "../models/index.js";

const insertOrder = async (req, res) => {
  const {
    customer_id,
    product_id,
    distributor_id,
    quantity,
    name,
    city,
    channel,
    sub_channel,
    country,
    latitude,
    longitude,
  } = req.body;
  const user_id = req.user.id;
  let customer;
  if (customer_id) {
    customer = await db.customers.findByPk(customer_id);
    if (!customer)
      return res
        .status(401)
        .json({ message: "Không tồn tại khách hàng tương ứng!" });
  } else {
    customer = await db.customers.create({
      name,
      city,
      channel,
      sub_channel,
      country,
      latitude,
      longitude,
    });
  }
  if (!customer) {
    return res.status(401).json({ message: "Không tồn tại khách hàng!" });
  }
  const distributor = await db.distributors.findByPk(distributor_id);
  if (!distributor) {
    return res.status(200).json({ message: "Không tồn tại Nhà cung cấp!" });
  }
  const product = await db.products.findByPk(product_id);
  if (!product) {
    return res.status(200).json({ message: "Không tồn tại Sản phẩm!" });
  }
  const order = await db.orders.create({
    product_id,
    distributor_id,
    user_id,
    customer_id: customer.id,
    quantity,
  });
  return res.status(201).json({ message: "Tạo mới thành công!", data: order });
};

const getAllOrder = async (req, res) => {
  let { page = 1, sortBy = "id", sortOrder = "ASC" } = req.query;

  page = page === "" ? 1 : parseInt(page);
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  const totalOrderCount = await db.orders.count();

  const orders = await db.orders.findAll({
    attributes: ["id", "quantity"],
    include: [
      {
        model: db.users,
        attributes: ["fullname"],
      },
      {
        model: db.distributors,
        attributes: ["name"],
      },
      {
        model: db.products,
        attributes: ["name"],
      },
      {
        model: db.customers,
        attributes: ["name"],
      },
    ],
    limit: pageSize,
    offset,
  });

  const res_orders = orders.map((order) => ({
    id: order.id,
    product: order.product?.name || "",
    customer: order.customer?.name || "",
    distributor: order.distributor?.name || "",
    user: order.user?.fullname || "",
    quantity: order.quantity,
  }));

  return res.status(200).json({
    message: "Thành công!",
    data: res_orders,
    currentPage: page,
    totalPage: Math.ceil(totalOrderCount / pageSize),
    totalItem: totalOrderCount,
  });
};

export { insertOrder, getAllOrder };
