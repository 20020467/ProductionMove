const OrderController = require("../controllers/OrderController");

const router = require("express").Router();


router.post("/add", OrderController.addOrder);
router.get("/getAll",OrderController.getAll);
router.put("/",OrderController.updateStatus);

module.exports = router;
