const { enquiry } = require("./enquiry.schema");

module.exports = {
  createEnquiryValidation: (req, res, next) => {
    try {
      const value = enquiry.validate(req.body);
      if (value?.error) {
        res.status(400).json({
          success: false,
          msg: value?.error.details[0]?.msg,
        });
      } else {
        next();
      }
    } catch {
      res.status(500).json({
        success: false,
        msg: "Internal Server Error",
      });
    }
  },
};
