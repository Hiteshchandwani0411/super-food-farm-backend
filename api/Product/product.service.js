const pool = require("../../config/database");

module.exports = {
    getAllProductService: (callback) => {
        pool.query(
            "SELECT * FROM `product` WHERE `deleted` = ?",
            [process.env.NOTDELETED],
            (error, result) => {
                if (error) {
                    console.error("SQL Error Details:", error);
                    return callback(error);
                } else return callback(null, result);
            },
        );
    },
    createProductService: (data, callback) => {
        pool.query(
            "INSERT INTO product (tag, category, title, star, product_sold, product_desc, actual_price, discounted_price, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                data.tag,
                data.category,
                data.title,
                data.star,
                data.product_sold,
                data.product_desc,
                data.actual_price,
                data.discounted_price,
                data.created_by,
            ],
            (error, result) => {
                console.log(result);
                if (error) {
                    console.error("SQL Error Details:", error);
                    return callback(error);
                } else return callback(null, result);
            },
        );
    },
    getOneProductService: (id, callback) => {
        pool.query(
            "SELECT * FROM `product` WHERE `id` = ?",
            [id],
            (error, result) => {
                console.log(result);
                if (error) {
                    console.error("SQL Error Details:", error);
                    return callback(error);
                } else return callback(null, result);
            },
        );
    },
    updateProductService: (id, data, callback) => {
        pool.query(
            "UPDATE `product` SET tag = ?, category = ?, title = ?, star = ?, product_sold = ?, product_desc = ?, actual_price = ?, discounted_price = ? WHERE id = ?",
            [
                data.tag,
                data.category,
                data.title,
                data.star,
                data.product_sold,
                data.product_desc,
                data.actual_price,
                data.discounted_price,
                id,
            ],
            (error, result) => {
                console.log(result);
                if (error) {
                    console.error("SQL Error Details:", error);
                    return callback(error);
                } else return callback(null, result);
            },
        );
    },
    deleteProductService: (id, callback) => {
        pool.query(
            " UPDATE `product` SET `deleted` = 1 WHERE id = ?",
            [id],
            (error, result) => {
                if (error) {
                    console.error("SQL Error Details:", error);
                    return callback(error);
                } else return callback(null, result);
            },
        );
    }
}