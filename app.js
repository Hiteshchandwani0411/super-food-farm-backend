require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const enquiryRouter = require("./api/enquiry/enquiry.router");
const cryptoRouter = require("./api/crypto/crypto.router");
const productRouter = require("./api/Product/product.router");
const path = require("path");

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "*",
}));

app.use("/api/enquiry", enquiryRouter);
app.use("/api", cryptoRouter);
app.use("/api/product", productRouter);
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT;

app.listen(port, (req, res) => {
    console.log(`app is listening on port ${port}`);
});