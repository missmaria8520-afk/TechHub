import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "../component/ProductCard";
import Pagination from "../component/Pagination";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import toast from "react-hot-toast";

export default function Shop() {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('-createdAt');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Fetch products with pagination
  const fetchProducts = async (page = 1, resetPage = false) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: resetPage ? 1 : page,
        limit: 12,
        sort: sortBy
      });

      // Add category filter
      if (selectedCategories.length > 0) {
        params.append('category', selectedCategories[0]); // For now, use first selected category
      }

      // Add search term
      if (searchTerm.trim()) {
        params.append('search', searchTerm.trim());
      }

      // Add price range
      if (priceRange.min) params.append('minPrice', priceRange.min);
      if (priceRange.max) params.append('maxPrice', priceRange.max);

      const res = await axiosPrivate.get(`/v1/products?${params}`);
      
      if (res.data.success) {
        setProducts(res.data.data || []);
        setPagination(res.data.pagination || {
          totalPages: 1,
          totalItems: 0,
          itemsPerPage: 12,
          currentPage: resetPage ? 1 : page,
          hasNextPage: false,
          hasPrevPage: false
        });
        
        if (resetPage) {
          setCurrentPage(1);
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axiosPrivate.get("/v1/categories");
      setCategories(res.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Initial fetch
  useEffect(() => {
    const init = async () => {
      await fetchCategories();
      if (initialCategory) {
        setSelectedCategories([initialCategory]);
      }
    };
    init();
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts(1, true); // Reset to page 1 when filters change
  }, [selectedCategories, searchTerm, sortBy, priceRange]);

  // Handle category checkbox changes
  const handleCategoryChange = (categoryName) => {
    const updatedCategories = selectedCategories.includes(categoryName)
      ? selectedCategories.filter((c) => c !== categoryName)
      : [categoryName]; // For now, allow only one category

    setSelectedCategories(updatedCategories);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(1, true);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Clear filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchTerm('');
    setPriceRange({ min: '', max: '' });
    setSortBy('-createdAt');
  };

  // Add to cart
  const handleAddToCart = async (productId) => {
    try {
      await axiosPrivate.post("/v1/cart/add", {
        productId,
        quantity: 1,
      });
      toast.success("Item added to cart");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <section className="bg-gray-50 py-20 lg:pt-40">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-blue-700">
          Shop Tech With Us!
        </h1>
        <p className="text-gray-600 mt-2">
          Explore our best tech selections curated just for you.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filters Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for laptops, phones, accessories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="-createdAt">Newest First</option>
              <option value="createdAt">Oldest First</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="productName">Name: A to Z</option>
              <option value="-productName">Name: Z to A</option>
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categories
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {categories.map((category, index) => (
                      <label key={index} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="accent-blue-600"
                          checked={selectedCategories.includes(category.categoryName)}
                          onChange={() => handleCategoryChange(category.categoryName)}
                        />
                        <span className="text-sm text-gray-700">{category.categoryName}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Quick Category Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/4"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-36">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Quick Categories
              </h2>
              <ul className="space-y-3">
                {categories.slice(0, 8).map((category, index) => (
                  <li
                    key={index}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedCategories.includes(category.categoryName)
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                    onClick={() => handleCategoryChange(category.categoryName)}
                  >
                    <span className="text-sm font-medium">{category.categoryName}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>

          {/* Products Section */}
          <div className="w-full lg:w-3/4">
            {/* Results Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <p className="text-gray-700 text-sm">
                {pagination.totalItems > 0 ? (
                  <>
                    Showing {((currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
                    {Math.min(currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
                    {pagination.totalItems} products
                  </>
                ) : (
                  'No products found'
                )}
              </p>
            </div>

            {/* Products Grid */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {loading ? (
                Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="space-y-2">
                      <div className="bg-gray-200 h-4 rounded"></div>
                      <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                      <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
              ) : products.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                products.map((product, index) => (
                  <motion.div 
                    key={product._id} 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <ProductCard
                      image={`http://localhost:3001/public/${product.images?.[0]}`}
                      name={product.productName}
                      category={product.category?.categoryName}
                      price={product.price}
                      oldPrice={product.oldPrice}
                      discount={product.discount}
                      unit={product.unit}
                      onAddToCart={() => handleAddToCart(product._id)}
                    />
                  </motion.div>
                ))
              )}
            </motion.div>

            {/* Pagination */}
            {!loading && products.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
                onPageChange={handlePageChange}
                className="mt-8"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
