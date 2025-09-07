// ProductModel.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    description: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    model: { type: String },
    specifications: {
      processor: { type: String },
      memory: { type: String },
      storage: { type: String },
      display: { type: String },
      connectivity: [{ type: String }],
      operatingSystem: { type: String },
      warranty: { type: String },
      color: { type: String },
      weight: { type: String },
      dimensions: { type: String }
    },
    inStock: { type: Number, default: 0 },
    oldPrice: { type: Number },
    discount: { type: Number },
    images: [{ type: String, required: true }],
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 }
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
