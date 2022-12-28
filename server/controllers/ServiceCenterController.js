const ServiceCenter = require("../model/ServiceCenter");

const ServiceCenterController = {
  // ADD PRODUCT
  addServiceCenter: async (req, res) => {
    try {
      const products = new ServiceCenter(req.body);
      const saveProducts = await products.save();
      res.status(200).json(saveProducts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // delete 
  deleteServiceCenter: async (req, res) => {
    try {
      const ID = req.params.id;
      const filter = { id: ID };
      const productUpdate = await ServiceCenter.findOneAndDelete(filter);
      res.status(200).json("xoa thanh cong");
    } catch (error) {
      res.status(500).json(error);
    }
  },


};
module.exports = ServiceCenterController;