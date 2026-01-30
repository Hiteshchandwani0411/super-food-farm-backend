const { encrypt, decrypt } = require("../../utils/crypto.util");

module.exports = {
  encryptId: (req, res) => {
    const id = req.params.id;
    try {
      const encryptedData = encrypt(id);
      return res.json({
        success: true,
        original: id,
        encrypted: encryptedData,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: "Encryption failed" });
    }
  },
  decryptId: (req, res) => {
    const encryptedId = req.params.id;
    try {
      const decryptedData = decrypt(encryptedId);
      return res.json({
        success: true,
        encrypted: encryptedId,
        decrypted: decryptedData,
      });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid encrypted ID" });
    }
  },
};
