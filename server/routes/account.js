const AccountController = require("../controllers/AccountController");

const router = require("express").Router();

// ADD ACCOUNT

router.post("/add", AccountController.addAccount);

router.get("/getAllAccount", AccountController.getAllAccount);
router.get("/find_by_username", AccountController.FindByUsername);

router.get("/getAllDistributor", AccountController.getAllDistributor);

router.get("/getAllFactory", AccountController.getAllFactory);

router.get("/getAllServiceCenter", AccountController.FindByUsername);

module.exports = router;
