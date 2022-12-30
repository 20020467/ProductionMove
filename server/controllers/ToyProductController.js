const Products = require("../model/ToyProduct");
const ProductLineTo = require("../model/ToyProductLine");

const ToyProductsController = {
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

  deleteProduct: async (req, res) => {
    try {
      const find = ToyProducts.find({ owner: req.body.owner });
      for (i = 0; i < find.length; i++) {
        await ToyProducts.findOneAndDelete({ _id: find[i]._id });
      }
      res.status(200).json("xoa thanh cong");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // find all product
  getAllProduct: async (req, res) => {
    try {
      const allProduct = await Products.find()
        .populate("idProductLine", "name")
        .populate("idFactory", "name")
        .populate("idDistributor", "name")
        .populate("located", "name")
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

  getDataProductLine: async (req, res) => {
    const key = req.params.key;
    try {
      const allProduct = await Products.find()
        .populate("idProductLine", "name")
        .populate("idProductLine", "name")
        .populate("idFactory", "name")
        .populate("idDistributor", "name")
        .populate("located", "name");
      var allVios = 0;
      var allFortuner = 0;
      var allRaize = 0;
      var allAltis = 0;
      var allCamry = 0;
      var allYaris = 0;
      for (var i = 0; i < allProduct.length; i++) {
        if (allProduct[i].located === key) {
          if (allProduct[i].idProductLine.name === "Vios") allVios++;
          if (allProduct[i].idProductLine.name === "Fortuner") allFortuner++;
          if (allProduct[i].idProductLine.name === "Raize") allRaize++;
          if (allProduct[i].idProductLine.name === "Altis") allAltis++;
          if (allProduct[i].idProductLine.name === "Camry") allCamry++;
          if (allProduct[i].idProductLine.name === "Yaris") allYaris++;
        }
      }

      const result = [];
      result.push(
        {
          name: "Vios",
          grossProductLine: allVios.length,
        },
        { name: "Fortuner", grossProductLine: allFortuner.length },
        { name: "Raize", grossProductLine: allRaize.length },
        { name: "Altis", grossProductLine: allAltis.length },
        { name: "Camry", grossProductLine: allCamry.length },
        { name: "Yaris", grossProductLine: allYaris.length }
      );

      res.status(200).json(result);
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

  // find all product in distributor
  getAllProductInLocation: async (req, res) => {
    try {
      const allProduct = await Products.find({
        status: "New",
        located: req.body._id,
      });
      res.status(200).json(allProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getALlRecall: async (req, res) => {
    try {
      const recallStatus = await Products.find({
        status: "Recall",
      })
        .populate("idProductLine", "name")
        .populate("idFactory", "name")
        .populate("idDistributor", "name")
        .populate("located", "name")
        .populate("owner", "name");
      res.status(200).json(recallStatus);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllProductInLocation2: async (req, res) => {
    try {
      const allProduct = await Products.find({
        located: req.params.id,
      })
        .populate("idProductLine", "name")
        .populate("idFactory", "name")
        .populate("idDistributor", "name")
        .populate("located", "name")
        .populate("owner", "name");
      res.status(200).json(allProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  countQuantification: async (req, res) => {
    try {
      const getAllProductLineTo = await ProductLineTo.find({});
      var count = Array(getAllProductLineTo.length).fill(0);
      const allProduct = await Products.find({
        status: "New",
        located: req.body._id,
      })
        .populate("idFactory", "name")
        .populate("located", "name")
        .populate("owner", "name");

      for (let i = 0; i < getAllProductLineTo.length; i++) {
        for (let j = 0; j < allProduct.length; j++) {
          if (
            JSON.stringify(getAllProductLineTo[i]._id) ===
            JSON.stringify(allProduct[j].idProductLine)
          ) {
            count[i] = count[i] + 1;
          }
        }
      }
      res.status(200).json(count);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  countQuantification2: async (req, res) => {
    try {
      const getAllProductLineTo = await ProductLineTo.find({});
      var count = Array(getAllProductLineTo.length).fill(0);
      const allProduct = await Products.find({
        status: "New",
        located: req.params.id,
      })
        .populate("idFactory", "name")
        .populate("located", "name")
        .populate("owner", "name");

      for (let i = 0; i < getAllProductLineTo.length; i++) {
        for (let j = 0; j < allProduct.length; j++) {
          if (
            JSON.stringify(getAllProductLineTo[i]._id) ===
            JSON.stringify(allProduct[j].idProductLine)
          ) {
            count[i] = count[i] + 1;
          }
        }
      }
      res.status(200).json(count);
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
  // find all new product in ServiceCenter
  getAllProductInSC: async (req, res) => {
    try {
      const allProduct = await Products.find(
        {
          located: req.body._id}
        )
        .populate("idProductLine", "name")
      res.status(200).json(allProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // find all defective product in each Factory
  getDefectiveProduct: async (req, res) => {
    try {
      const allProduct = await Products.find(
        {
          status: "Can't warranty",
          located: req.body._id}
        )
        .populate("idProductLine", "name")
      res.status(200).json(allProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // delete product
  deleteProduct: async (req, res) => {
    try {
      const ID = req.params.id;
      const productUpdate = await Products.findOneAndDelete(ID);
      res.status(200).json(productUpdate);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = ToyProductsController;
