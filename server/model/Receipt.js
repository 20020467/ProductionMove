const mongoose = require("mongoose");
const Customer = require("./Customer");
const Product = require("./Product");
const Account = require("./Account");

const ReceiptSchema = new mongoose.Schema(
  {
    idCustomer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Customer,
      required: true,
    },
    idDistributor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Account,
      required: true,
    },
    idProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    orderDate: {
      type: String,
      required: true,
    },
    completionDate: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Receipt", ReceiptSchema);
