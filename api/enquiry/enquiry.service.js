const pool = require("../../config/database");

module.exports = {
  getAllEnquiryService: (callback) => {
    pool.query(
      "SELECT * FROM `enquiry_data` WHERE `deleted` = ?",
      [process.env.NOTDELETED],
      (error, result) => {
        if (error) {
          console.error("SQL Error Details:", error);
          return callback(error);
        } else return callback(null, result);
      },
    );
  },

  getOneEnquiryService: (id, callback) => {
    pool.query(
      `SELECT * FROM enquiry_data WHERE id=?`,
      [id],
      (error, result) => {
        if (error)
          return callback(
            error?.sqlMessage || "Error while fetching a student",
          );
        else return callback(null, result);
      },
    );
  },

  createEnquiryService: (data, callback) => {
    pool.query(
      `INSERT INTO enquiry_data (
            company_name, username, mobile, email, source, 
            tag, status, city, pin_code, state, 
            budget, industry, designation, quantity, event_date, 
            keyword, created_by
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.company_name,
        data.username,
        data.mobile,
        data.email,
        data.source,
        data.tag,
        data.status,
        data.city,
        data.pin_code,
        data.state,
        data.budget,
        data.industry,
        data.designation,
        data.quantity,
        data.event_date,
        data.keyword,
        data.created_by,
      ],
      (error, result) => {
        if (error) {
          console.error("SQL Error Details:", error);
          return callback(error);
        } else return callback(null, result);
      },
    );
  },

  updateEnquiryService: (id, data, callback) => {
    pool.query(
      `UPDATE enquiry_data SET company_name=?, username=?, mobile=?, email=?, source=?, 
            tag=?, status=?, city=?, pin_code=?, state=?, 
            budget=?, industry=?, designation=?, quantity=?, event_date=?, 
            keyword=?, updated_dt=? WHERE id = ?`,
      [
        data.company_name,
        data.username,
        data.mobile,
        data.email,
        data.source,
        data.tag,
        data.status,
        data.city,
        data.pin_code,
        data.state,
        data.budget,
        data.industry,
        data.designation,
        data.quantity,
        data.event_date,
        data.keyword,
        data.updated_dt,
        id,
      ],
      (error, result) => {
        if (error) {
          console.error("SQL Error Details:", error);
          return callback(error);
        } else return callback(null, result);
      },
    );
  },

  deleteEnquiryService: (id, callback) => {
    pool.query(
      `UPDATE enquiry_data SET deleted=1 WHERE id=?`,
      [id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },
};
