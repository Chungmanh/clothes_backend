const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const order = new Schema(
  {
    name: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    status: { type: Boolean, default: false },
    detail: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "product" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", order);
