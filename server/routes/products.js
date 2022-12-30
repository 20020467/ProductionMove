const ProductsController = require("../controllers/ProductController");

const router = require("express").Router();

router.post("/add", ProductsController.addProduct);

router.put("/", ProductsController.updateProduct);

router.get("/getAll", ProductsController.getAllProduct);
router.get(
  "/getProductInLocation/:id",
  ProductsController.getAllProductInLocation
);
router.get("/getDataProductLine", ProductsController.getDataProductLine);
router.get("/getStatus", ProductsController.getStatusProduct);

router.delete("/:id", ProductsController.deleteProduct);
router.get("/getAllTest", ProductsController.getAllTest);

module.exports = router;
