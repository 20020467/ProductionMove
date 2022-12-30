const mongoose = require('mongoose');
const Account = require('./Account');
const ProductLine = require('./ProductLine');

const OrderSchema = new mongoose.Schema({
    idDistributor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Account,
        required: true,
    },
    idFactory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Account,
        required: true,
    },
    idProductLine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ProductLine,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    orderDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
}, { timestamps: true });
module.exports = mongoose.model("Order", OrderSchema);