const { result } = require("@hapi/joi/lib/base");
const {
  getAllEnquiryService,
  createEnquiryService,
  updateEnquiryService,
  deleteEnquiryService,
  getOneEnquiryService,
} = require("./enquiry.service");
const { encrypt } = require("../../utils/crypto.util");
const { decryptId } = require("../crypto/crypto.controller");
const {decrypt} = require("../../utils/crypto.util");

module.exports = {
  getAllEnquiries: (req, res) => {
    getAllEnquiryService((err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database connection error",
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
        data: encryptedResults,
      });
    });
  },

  getOneEnquiry: (req, res) => {
    const securedId = req.params.id;
    const originalId = decrypt(securedId);
    getOneEnquiryService(originalId, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }
      return res.status(200).json({
        success: true,
        msg: result?.length > 0 ? "Student ID found" : "Student ID not found",
        result: result,
      });
    });
  },

  addEnquiry: (req, res) => {
    const body = req.body;

    createEnquiryService(body, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.sqlMessage || "Database error",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Enquiry saved without token!",
        data: result,
      });
    });
  },

  updateEnquiry: (req, res) => {
    const securedId = req.params.id;
    const originalId = decrypt(securedId);
    const data = req.body;
    data.updated_dt = new Date();

    updateEnquiryService(originalId, data, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }
      if (result.affectedRows == 0) {
        return res.status(404).json({
          success: false,
          message: "Enquiry not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Enquiry updated successfully",
      });
    });
  },

  deleteEnquiry: (req, res) => {
    const securedId = req.params.id;
    // console.log(id);
    const originalId = decrypt(securedId);
    console.log(originalId);
    deleteEnquiryService(originalId, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }
      if (result.affectedRows == 0) {
        return res.status(404).json({
          success: false,
          message: "Enquiry not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Enquiry deleted successfully",
      });
    });
  },
};
