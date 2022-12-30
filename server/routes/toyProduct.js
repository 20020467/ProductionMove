const ToyProductsController = require("../controllers/ToyProductController");

const router = require("express").Router();

router.post("/add", ToyProductsController.addProduct);
router.put("/", ToyProductsController.updateProduct);

router.get("/getAll", ToyProductsController.getAllProduct);
router.post("/getInLocation", ToyProductsController.getAllProductInLocation);
router.post("/countQuantification", ToyProductsController.countQuantification);
router.get("/getAllTest", ToyProductsController.getAllTest);

router.delete("/", ToyProductsController.deleteProduct);

module.exports = router;
