const Product = require("../model/productmodel");
const Category = require("../model/category.model");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      category,
      price,
      images,
      discount,
      brand,
      model,
      specifications,
      inStock,
    } = req.body;

    // Check if category exists
    const foundCategory = await Category.findById(category);
    if (!foundCategory) {
      return res.status(400).json({ message: "Invalid category" });
    }

    let imagePaths = req.files
      ? req.files.map((file) => file.filename)
      : undefined;

    let finalPrice = price;
    let oldPrice = undefined;

    if (discount) {
      oldPrice = price;
      finalPrice = price - (price * discount) / 100;
    }

    const newProduct = new Product({
      productName,
      description,
      category: foundCategory._id,
      price: finalPrice,
      oldPrice: oldPrice,
      brand,
      model,
      specifications,
      inStock: inStock || 0,
      images,
      discount: discount || 0,
    });

    if (imagePaths) {
      newProduct.images = imagePaths;
    }
    await newProduct.save();
    return res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

// Get all products with pagination
exports.getAllProducts = async (req, res) => {
  try {
    let filter = {};
    
    // Extract query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const sort = req.query.sort || '-createdAt';
    const search = req.query.search;
    
    // If category is provided, filter by category
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    // If search term is provided, search in name and description
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Price filtering
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get products with pagination
    const products = await Product.find(filter)
      .populate('category')
      .sort(sort)
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);
    
    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalProducts,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving product", error: error.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, description, category, price, discount, brand, model, specifications, inStock } =
      req.body;

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    let imagePaths;

    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map((file) => file.filename);
    } else {
      imagePaths = existingProduct.images; // Preserve existing images
    }

    // Handle discount logic
    let finalPrice = price;
    let oldPrice = undefined;

    if (discount) {
      oldPrice = price;
      finalPrice = price - (price * discount) / 100;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        productName,
        description,
        category,
        brand,
        model,
        specifications,
        inStock,
        price: finalPrice,
        discount: discount || 0,
        oldPrice: oldPrice,
        images: imagePaths, // Always set this explicitly
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};
