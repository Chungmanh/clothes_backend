const orderModel = require("../models/order");

exports.addOrder = async (order) => {
  console.log("order: ", order);
  const orderCreated = await orderModel.create(order);
  return orderCreated;
};

exports.getAllOrder = async () => {
  const orders = await orderModel.find({});
  return orders;
};
