const { product } = require("../../validation/product/product.schema");
const { getAllProductService, createProductService, getOneProductService, updateProductService, deleteProductService } = require("./product.service");
const {encrypt, decrypt} = require('../../utils/crypto.util');

module.exports = {
    getAllProduct: (req, res) => {
        getAllProductService((err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    msg: "Database connection error",
                });
            } 

            const encryptedResults = result.map((row) => {
                return {
                    ...row,
                    id: encrypt(row.id),
                };
            });

            return res.status(200).json({
                success: true,
                msg: result?.length > 0 ? "product found" : "product not found",
                result: encryptedResults,
            });
        });
    },
    createProduct: (req, res) => {
        const data = req.body;
        console.log(data);
        createProductService(data, (err, result) => {
            console.log(result);
            if (err) {
                return res.status(500).json({
                    success: false,
                    msg: "Database connection error",
                });
            } else {
                return res.status(200).json({
                    success: true,
                    msg: result?.affectedRows > 0 ? "product created" : "product not created",
                    result: result,
                });
            }
        });
    },
    getOneProduct: (req, res) => {
        const securedId = req.params.id;
        const originalId = decrypt(securedId);
        getOneProductService(originalId, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database error",
                });
            } else {
                return res.status(200).json({
                    success: true,
                    msg: result?.length > 0 ? "product found" : "product not found",
                    result: result,
                });
            }
        });
    },
    updateProduct: (req, res) => {
        const securedId = req.params.id;
        const originalId = decrypt(securedId);
        const data = req.body;
        updateProductService(originalId, data, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    msg: "Database connection error",
                });
            } else {
                console.log(result);
                return res.status(200).json({
                    success: true,
                    msg: result?.affectedRows > 0 ? "product updated" : "product not updated",
                    result: result,
                });
            }
        });
    },
    deleteProduct: (req, res) => {
        const securedId = req.params.id;
        const originalId = decrypt(securedId);
        deleteProductService(originalId, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    msg: "Database connection error",
                });
            } 

            return res.status(200).json({
                success: true,
                msg: result?.affectedRows > 0 ? "product deleted" : "product not deleted",
                result: result,
            });
        });
    }
}