const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, default: "Khác" },
    brand: { type: String, default: "No brand" },
    label: { type: String, default: "Khác" },
    sex: { type: Boolean, default: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "category" },
    description: { type: String, maxLength: 300 },
    image: { type: Array, default: [] },
    status: { type: Boolean, default: true },
    amount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

product.index({
  name: "text",
  type: "text",
  brand: "text",
  description: "text",
});

module.exports = mongoose.model("product", product);
