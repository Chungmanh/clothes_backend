const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const middleware = require("../middlewarea/middlewareController");

router.post("/add", async function (req, res) {
  const category = await categoryController.addCategory(req.body);
  res.json(category);
});

router.put("/edit", async function (req, res) {
  try {
    const category = await categoryController.updateCategory(req.body);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.get("/all", async function (req, res) {
  const category = await categoryController.getAllCategory();
  res.json(category);
});

router.get("/:id", async (req, res, next) => {
  try {
    const category = await categoryController.getCategoryById(req.params.id);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const category = await categoryController.deleteCategory(req.params.id);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const category = await categoryController.getCategoryBySearch(
      req.query.search
    );
    res.json(category);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
