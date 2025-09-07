const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, default: 1 }, // Default quantity is 1
});

module.exports = mongoose.model("CartItem", cartItemSchema);
