const categoryModel = require("../models/category");

exports.getAllCategory = async () => {
  const categorys = await categoryModel.find({}).sort({ createdAt: -1 }).lean();
  return categorys;
};

exports.addCategory = async (category) => {
  const categoryCreated = await categoryModel.create(category);
  return categoryCreated;
};

exports.updateCategory = async (category) => {
  // console.log("category: ", category);
  const categoryUpdated = await categoryModel.findByIdAndUpdate(
    category._id,
    category
  );
  return categoryUpdated;
};

exports.deleteCategory = async (id) => {
  const categoryDeleted = await categoryModel.findByIdAndDelete(id);
  return categoryDeleted;
};

exports.getCategoryById = async (id) => {
  const category = await categoryModel.findById(id);
  return category;
};

exports.getCategoryBySearch = async (keyword) => {
  // const categorys = await categoryModel.find({ $text: { $search: keyword } });
  const categorys = await categoryModel.find({
    name: { $regex: `.*${keyword}.*`, $options: "i" },
  });
  return categorys;
};

exports.getCategoryByText = async (keyword) => {
  const key = keyword.trim();
  let categorys = [];
  if (key !== "") {
    categorys = await categoryModel.find({
      name: { $regex: keyword, $options: "i" },
    });
  }
  return categorys;
};

// exports.getCategoryByPage = async (page) => {
//   const count = 10 * (page - 1);
//   const categorys = await categoryModel
//     .find({})
//     .sort({ createdAt: -1 })
//     .skip(count)
//     .limit(10)
//     .lean();
//   return categorys;
// };

// exports.getTotalCategory = async () => {
//   const totalCategory = await categoryModel.find().count();
//   return totalCategory;
// };
