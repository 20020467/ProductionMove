const Receipt = require("../model/Receipt");

const ReceiptController = {
  // ADD Receipt
  addReceipt: async (req, res) => {
    try {
      const receipt = new Receipt(req.body);
      const saveReceipt = await receipt.save();
      res.status(200).json(saveReceipt);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllReceipt: async (req, res) => {
    try {
      const allReceipt = await Receipt.find();
      res.status(200).json(allReceipt);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = ReceiptController;
