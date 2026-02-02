const router = require("express").Router();
const {createProductValidation} = require("../../validation/product/product.validation");
const { getAllProduct, createProduct, getOneProduct, updateProduct, deleteProduct } = require("./Product.controller");

router.get("/all", getAllProduct);
router.post("/create", createProductValidation, createProduct);
router.get("/:id", createProductValidation, getOneProduct);
router.put("/:id", createProductValidation, updateProduct);
router.delete("/:id", createProductValidation, deleteProduct);

module.exports = router;