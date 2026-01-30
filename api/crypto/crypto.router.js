const {encryptId, decryptId} = require("./crypto.controller");
const router = require("express").Router();

router.get("/encrypt/:id", encryptId);
router.get("/decrypt/:id", decryptId);

module.exports = router;