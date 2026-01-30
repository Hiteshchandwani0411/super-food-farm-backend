require("dotenv").config();
const express = require("express");
const cors = require("cors");
const enquiryRouter = require("./api/enquiry/enquiry.router");
const cryptoRouter = require("./api/crypto/crypto.router");
const app = express();

app.use(express.json());
app.use(cors({
    origin: "*",
}));

app.use("/api/enquiry", enquiryRouter);
app.use("/api", cryptoRouter);

const port = process.env.PORT;

app.listen(port, (req, res) => {
    console.log(`app is listening on port ${port}`);
});