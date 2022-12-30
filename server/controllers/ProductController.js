const Products = require("../model/Product");

const ProductsController = {
  // ADD PRODUCT
  addProduct: async (req, res) => {
    try {
      const products = new Products(req.body);
      const saveProducts = await products.save();
      res.status(200).json(saveProducts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // find all product
  getAllProduct: async (req, res) => {
    try {
      const allProduct = await Products.find()
        .populate("idFactory", "name")
        .populate("idDistributor", "name")
        .populate("idProductLine", "name")
        .populate("location", "name")
        .populate("owner", "name");
      res.status(200).json(allProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllTest: async (req, res) => {
    try {
      const allProduct = await Products.find()
        .populate("idFactory", "name")
        .populate("idDistributor", "name")
        .populate("idProductLine", "name")
        .populate("location", "name")
        .populate("owner", "name");
      // res.status(200).json(allProduct);
      const result = [];
      if (allProduct.length !== null) {
        for (var i = 0; i < allProduct.length; i++) {
          const temp = {
            id: allProduct[i]._id,
            name: allProduct[i].name,
            color: allProduct[i].color,
            Factory: allProduct[i].idFactory.name,
            Distributor: allProduct[i].idDistributor.name,
            Status: allProduct[i].status,
            Location: allProduct[i].name,
            Owner: allProduct[i].name,
          };
          result.push(temp);
        }
        res.status(200).json(result);
      } else {
        res.json("khong co product");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // find all product in Location
  getAllProductInLocation: async (req, res) => {
    try {
      const allProduct = await Products.find({ location: req.params.id });
      res.status(200).json(allProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // get status
  getStatusProduct: async (req, res) => {
    try {
      const newStatus = await Products.find({
        status: "New",
      });
      const sellStatus = await Products.find({
        status: "Selling",
      });
      const timeOutStatus = await Products.find({
        status: "Out Warranty",
      });
      const warrantStatus = await Products.find({
        status: "Warranty",
      });
      const warrantedStatus = await Products.find({
        status: "Warranty Complete",
      });
      const recallStatus = await Products.find({
        status: "Recall",
      });
      const result = [];
      result.push(
        { name: "New", grossProduct: newStatus.length },
        { name: "Selling", grossProduct: sellStatus.length },
        { name: "OutWarranty", grossProduct: timeOutStatus.length },
        { name: "Warranty", grossProduct: warrantStatus.length },
        { name: "Warranted", grossProduct: warrantedStatus.length },
        { name: "Recall", grossProduct: recallStatus.length }
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getDataProductLine: async (req, res) => {
    try {
      //   const allToyota = await Products.find({
      //     name: "Toyota",
      //     located: req.params.id,
      //   });

      //   const allLexus = await Products.find({
      //     name: "Lexus",
      //     located: req.params.id,
      //   });
      //   const allHonda = await Products.find({
      //     name: "Honda",
      //     located: req.params.id,
      //   });
      //   const allSuzuki = await Products.find({
      //     name: "Suzuki",
      //     located: req.params.id,
      //   });
      //   const allRollsRoyce = await Products.find({
      //     name: "Rolls-royce",
      //     located: req.params.id,
      //   });
      //   const result = [];
      //   result.push(
      //     {
      //       name: "Toyota",
      //       grossProductLine: allToyota.length,
      //     },
      //     { name: "Lexus", grossProductLine: allLexus.length },
      //     { name: "Honda", grossProductLine: allHonda.length },
      //     { name: "Suzuki", grossProductLine: allSuzuki.length },
      //     { name: "Rolls-royce", grossProductLine: allRollsRoyce.length }
      //   );
      const allProduct = await Products.find()
        .populate("idFactory", "name")
        .populate("idDistributor", "name")
        .populate("idProductLine", "name")
        .populate("location", "name")
        .populate("owner", "name");

      res.status(200).json(allProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // find all product in manufacture factory
  // find all product in service center

  // Update product
  updateProduct: async (req, res) => {
    try {
      const ID = req.body._id;
      const update = req.body;
      const productUpdate = await Products.findByIdAndUpdate(ID, update, {
        new: true,
        upsert: true,
        rawResult: true, // Return the raw result from the MongoDB driver
      });
      res.json(productUpdate);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // delete product
  deleteProduct: async (req, res) => {
    try {
      const ID = req.params.id;
      const filter = { id: ID };
      const productUpdate = await Products.findOneAndDelete(filter);
      res.status(200).json("xoa thanh cong");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = ProductsController;
