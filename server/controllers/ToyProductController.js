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
      const find = ToyProducts.find({owner: req.body.owner})
      for (i=0; i<find.length; i++){
        await ToyProducts.findOneAndDelete({_id : find[i]._id})
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

  // find all new product in Location
  getAllProductInLocation: async (req, res) => {
    try {
      const allProduct = await Products.find(
        { status: "New",
          located: req.body._id}
        )
        .populate("idProductLine", "name")
      res.status(200).json(allProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  countQuantification: async (req, res) => {
    try {
      const getAllProductLineTo = await ProductLineTo.find({});
      var count = Array(getAllProductLineTo.length).fill(0);
      const allProduct = await Products.find(
        { status: "New",
          located: req.body._id}
        )
        .populate("idFactory", "name")
        .populate("located", "name")
        .populate("owner", "name");

      for(let i = 0;i< getAllProductLineTo.length;i++){
        for(let j = 0;j< allProduct.length;j++){
          if(JSON.stringify(getAllProductLineTo[i]._id) === JSON.stringify(allProduct[j].idProductLine)){
            count[i] = count[i]+1;   
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

module.exports = ToyProductsController;
