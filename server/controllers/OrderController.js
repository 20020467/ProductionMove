const Order = require("../model/Order");

const OrderController = {
  //add
  addOrder: async (req,res) => {
    try {
      const products = new Order(req.body);
      const saveProducts = await products.save();
      res.status(200).json(saveProducts);
    } catch (error) {
        res.status(500).json(error);
    }
  },

  getAll: async (req, res) => {
    try {
      const allProduct = await Order.find();
      res.status(200).json(allProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Update 
  updateStatus: async (req, res) => {
    try {
      const ID = req.body._id;
      const update = req.body;
      const productUpdate = await Order.findByIdAndUpdate(ID, update, {
        new: true,
        upsert: true,
        rawResult: true, 
      });
      res.json(productUpdate);
    } catch (error) {
      res.status(500).json(error);
    }
  },

};

module.exports = OrderController;
