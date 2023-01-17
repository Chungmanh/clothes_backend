const express = require("express");
const router = express.Router();
const multer = require("multer");
const productController = require("../controllers/product.controller");
const middleware = require("../middlewarea/middlewareController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/testApi", middleware.checklogiṇ, function (req, res) {
  res.json("hehehe");
});

router.get("/product", async (req, res) => {
  const products = await productController.getAllProduct();
  res.json(products);
});

// router.post("/product", async (req, res) => {
//   await productController.addProduct(req.body);
//   res.json("oke");
// });

router.post("/add", upload.single("image"), async (req, res, next) => {
  try {
    const productAdd = req.body;
    if (req.file) {
      productAdd.image = [];
      productAdd["image"].push("http://localhost:8000/" + req.file.path);
    }
    if (productAdd && productAdd._id) {
      delete productAdd._id;
    }
    const product = await productController.addProduct(productAdd);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.put("/edit", upload.single("image"), async (req, res, next) => {
  try {
    const product = req.body;
    if (req.file) {
      product.image = [];
      product["image"].push("http://localhost:8080/" + req.file.path);
    }
    await productController.updateProduct(product);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const product = await productController.deleteProduct(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.get("/product/:id", async (req, res, next) => {
  try {
    const product = await productController.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const product = await productController.getProductBySearch(req.query.text);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.get("/search-key", async (req, res, next) => {
  try {
    const product = await productController.getProductByText(req.query.text);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.get("/home", async (req, res, next) => {
  try {
    let page = 1;
    // console.log("req.query: ", req.query);
    // console.log("req.query.page: ", req.query.page);
    if (req.query.page) {
      page = req.query.page;
    }

    const query = req.query;

    const productAndTotal = await productController.getProductByPage(
      page,
      query
    );
    // const totalProduct = await productController.getTotalProduct();
    // if (req.user) {
    //   const userRated = await customerController.getRateByUserId(req.user.id);
    //   for (let i = 0; i < listProduct.length; i++) {
    //     for (let j = 0; j < userRated.length; j++) {
    //       if (listProduct[i]._id.equals(userRated[j].productId)) {
    //         listProduct[i].vote = userRated[j].vote;
    //       }
    //     }
    //   }
    // }
    res.json(productAndTotal);
  } catch (error) {
    next(error);
  }
});

router.get("/home/:category", async (req, res, next) => {
  try {
    let page = 1;
    // console.log("req.query: ", req.query);
    // console.log("req.query.page: ", req.query.page);
    // console.log("req.params: ", req.params);
    if (req.query.page) {
      page = req.query.page;
    }

    const query = req.query;
    const categoryId = req.params.category;

    const productAndTotal = await productController.getProductByPage(
      page,
      query,
      categoryId
    );
    // const total = await productController.getTotalProduct();
    // const total = listProduct.length;
    // console.log("productAndTotal: ", productAndTotal);
    res.json(productAndTotal);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
