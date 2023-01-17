const productModel = require("../models/product");

exports.getAllProduct = async () => {
  const products = await productModel.find({}).sort({ createdAt: -1 }).lean();
  return products;
};

exports.getProductByPage = async (page, query, categoryId) => {
  const { brand, type, label } = query;
  const $and = [];
  // console.log("query: ", query);
  const category = categoryId ? { categoryId } : {};
  $and.push(category);
  // console.log("categoryId: ", { categoryId });
  // $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ]
  if (brand) {
    $and.push({ brand });
  }
  if (type) {
    $and.push({ type });
  }
  if (label) {
    $and.push({ label });
  }

  // console.log("$and: ", $and);

  const count = 10 * (page - 1);
  const totalProduct = await productModel.find({ $and }).count();
  const products = await productModel
    // .find(category)
    .find({ $and })
    .sort({ createdAt: -1 })
    .skip(count)
    .limit(10)
    .lean();
  return { products, totalProduct };
};

exports.getTotalProduct = async () => {
  const totalProduct = await productModel.find().count();
  return totalProduct;
};

exports.addProduct = async (product) => {
  const productCreated = await productModel.create(product);
  return productCreated;
};

exports.updateProduct = async (product) => {
  // console.log("product: ", product);
  const productUpdated = await productModel.findByIdAndUpdate(
    product._id,
    product
  );
  return productUpdated;
};

exports.deleteProduct = async (id) => {
  const productDeleted = await productModel.findByIdAndDelete(id);
  return productDeleted;
};

exports.getProductById = async (id) => {
  const product = await productModel.findById(id);
  return product;
};

exports.getProductByArrayId = async (arrayId) => {
  const products = await productModel.find({
    _id: { $in: arrayId },
  });
  return products;
};

exports.getProductBySearch = async (keyword) => {
  const products = await productModel.find({ $text: { $search: keyword } });
  return products;
};

exports.getProductByText = async (keyword) => {
  const key = keyword.trim();
  let products = [];
  if (key !== "") {
    products = await productModel.find({
      name: { $regex: keyword, $options: "i" },
    });
  }
  return products;
};
