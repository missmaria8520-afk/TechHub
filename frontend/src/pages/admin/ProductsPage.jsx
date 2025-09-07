import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Pagination from "../../component/Pagination";
import toast from "react-hot-toast";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('-createdAt');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasNextPage: false,
    hasPrevPage: false
  });

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const fetchProducts = async (page = 1, resetPage = false) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: resetPage ? 1 : page,
        limit: 10,
        sort: sortBy
      });

      // Add search term
      if (searchTerm.trim()) {
        params.append('search', searchTerm.trim());
      }

      const response = await axiosPrivate.get(`/v1/products?${params}`);
      
      if (response.data.success) {
        setProducts(response.data.data || []);
        setPagination(response.data.pagination || {
          totalPages: 1,
          totalItems: 0,
          itemsPerPage: 10,
          currentPage: resetPage ? 1 : page,
          hasNextPage: false,
          hasPrevPage: false
        });
        
        if (resetPage) {
          setCurrentPage(1);
        }
      } else {
        // Fallback for old API response format
        setProducts(response.data.products || []);
      }
    } catch (err) {
      toast.error("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products when search or sort changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts(1, true); // Reset to page 1 when search changes
    }, 500); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchTerm, sortBy]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts(page);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(1, true);
  };

  const handleEdit = (id) => {
    navigate(`/admin/products/update/${id}`);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await axiosPrivate.delete(`/v1/product/${id}`);
      toast.success("Product deleted");
      
      // Refresh current page or go to previous page if current page becomes empty
      const itemsOnCurrentPage = products.length;
      if (itemsOnCurrentPage === 1 && currentPage > 1) {
        handlePageChange(currentPage - 1);
      } else {
        fetchProducts(currentPage);
      }
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  const handleCreate = () => {
    navigate("create");
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Products</h1>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Product
        </button>
      </div>

      {/* Search and Sort Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </form>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="productName">Name: A to Z</option>
            <option value="-productName">Name: Z to A</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
          </select>
        </div>

        {/* Results count */}
        {!loading && (
          <div className="mt-4 text-sm text-gray-600">
            {pagination.totalItems > 0 ? (
              <>
                Showing {((currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
                {Math.min(currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
                {pagination.totalItems} products
              </>
            ) : (
              'No products found'
            )}
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Images
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-gray-200 h-10 w-10 rounded"></div>
                        <div className="ml-4">
                          <div className="bg-gray-200 h-4 w-32 rounded"></div>
                          <div className="bg-gray-200 h-3 w-24 rounded mt-1"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="bg-gray-200 h-4 w-20 rounded"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="bg-gray-200 h-4 w-16 rounded"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="bg-gray-200 h-4 w-12 rounded"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="bg-gray-200 h-8 w-16 rounded"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="bg-gray-200 h-8 w-16 rounded"></div>
                    </td>
                  </tr>
                ))
              ) : products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={`http://localhost:3001/public/${product.images[0]}`}
                            alt={product.productName}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No img</span>
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.productName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.brand} {product.model}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {product.category?.categoryName || 'No category'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Rs. {product.price?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        product.stock > 10 
                          ? 'bg-green-100 text-green-800' 
                          : product.stock > 0 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-1">
                        {product.images?.slice(0, 3).map((img, i) => (
                          <img
                            key={i}
                            src={`http://localhost:3001/public/${img}`}
                            alt={`${product.productName} ${i + 1}`}
                            className="w-8 h-8 object-cover rounded border"
                          />
                        ))}
                        {product.images?.length > 3 && (
                          <div className="w-8 h-8 bg-gray-100 rounded border flex items-center justify-center">
                            <span className="text-xs text-gray-500">+{product.images.length - 3}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product._id)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                          title="Edit product"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <p className="text-lg mb-2">No products found</p>
                      <p className="text-sm">Try adjusting your search criteria</p>
                      <button
                        onClick={handleCreate}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Create your first product
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && products.length > 0 && pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              itemsPerPage={pagination.itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
