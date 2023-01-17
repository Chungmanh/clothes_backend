const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const middleware = require("../middlewarea/middlewareController");

router.post("/add", async function (req, res) {
  console.log("req: ", req.body);
  const order = await orderController.addOrder(req.body);
  res.json(order);
});

router.get("/all", async function (req, res) {
  const order = await orderController.getAllOrder();
  res.json(order);
});

module.exports = router;
