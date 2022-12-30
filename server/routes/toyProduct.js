const ToyProductsController = require("../controllers/ToyProductController");

const router = require("express").Router();

router.post("/add", ToyProductsController.addProduct);
router.put("/", ToyProductsController.updateProduct);

router.get("/getAll", ToyProductsController.getAllProduct);
router.post("/getInLocation", ToyProductsController.getAllProductInLocation);
router.post("/getInSC", ToyProductsController.getAllProductInSC);
router.post("/getDefectiveProduct", ToyProductsController.getDefectiveProduct);

router.post("/countQuantification", ToyProductsController.countQuantification);
router.get("/getAllTest", ToyProductsController.getAllTest);
router.get("/getStatus", ToyProductsController.getStatusProduct);
router.get(
  "/getDataProductLine/:key",
  ToyProductsController.getDataProductLine
);

router.get("/getRecall", ToyProductsController.getALlRecall);

router.get(
  "/getAllDistributor/:id",
  ToyProductsController.getAllProductInLocation2
);

router.get("/countQuantification", ToyProductsController.countQuantification);
router.get(
  "/countQuantification2/:id",
  ToyProductsController.countQuantification2
);

router.delete("/:id", ToyProductsController.deleteProduct);

module.exports = router;
