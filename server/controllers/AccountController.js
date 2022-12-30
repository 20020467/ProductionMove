const Account = require("../model/Account");

const AccountController = {
  // ADD Account
  addAccount: async (req, res) => {
    const username = req.body.username;
    try {
      const acc = await Account.findOne({ username: username });
      if (acc !== null) {
        res.json({ status: "Account already exists" });
      } else {
        const account = new Account(req.body);
        const saveAccount = await account.save();
        res.status(200).json({ status: "success" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // find all account
  getAllAccount: async (req, res) => {
    try {
      const allAccount = await Account.find();
      res.status(200).json(allAccount);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // FIND BY USERNAME
  FindByUsername: async (req, res) => {
    try {
      const username = req.body.username;
      await Account.find({ username: username });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //Get all đại lí
  getAllDistributor: async (req, res) => {
    try {
      const allProduct = await Account.find({ typeAccount: "Distributor" });
      res.status(200).json(allProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllFactory: async (req, res) => {
    try {
      const allProduct = await Account.find({ typeAccount: "Factory" });
      res.status(200).json(allProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllServiceCenter: async (req, res) => {
    try {
      const allProduct = await Account.find({ typeAccount: "Servicecenter" });
      res.status(200).json(allProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Update account
  updateAccount: async (req, res) => {
    try {
      const ID = req.body._id;
      const update = req.body;
      const productUpdate = await Account.findByIdAndUpdate(ID, update, {
        new: true,
        upsert: true,
        rawResult: true, // Return the raw result from the MongoDB driver
      });
      res.json(productUpdate);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = AccountController;
