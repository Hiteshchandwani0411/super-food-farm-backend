const { createEnquiryValidation } = require("../../validation/enquiry/enquiry.validation");
const { getAllEnquiries, addEnquiry, updateEnquiry, deleteEnquiry, getOneEnquiry } = require("./enquiry.controller")
const router = require("express").Router();

router.post("/create", createEnquiryValidation, addEnquiry);
router.get("/all", createEnquiryValidation, getAllEnquiries);
router.get("/:id", createEnquiryValidation, getOneEnquiry);
router.put("/:id", createEnquiryValidation, updateEnquiry);
router.delete("/:id",createEnquiryValidation, deleteEnquiry);

module.exports = router;