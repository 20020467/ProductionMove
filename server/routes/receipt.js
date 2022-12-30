const ReceiptController = require("../controllers/ReceiptController");

const router = require("express").Router();

// ADD ACCOUNT

router.post("/add", ReceiptController.addReceipt);

router.get("/getAllReceipt", ReceiptController.getAllReceipt);

module.exports = router;
