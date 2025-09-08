import { ShoppingCart } from "lucide-react";

export default function ProductCard({
  image,
  name,
  category,
  unit,
  price,
  oldPrice,
  discount,
  onAddToCart,
}) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 w-full max-w-xs">
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          -{discount}%
        </div>
      )}

      {/* Product Image */}
      <div className="relative w-full h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col">
        <p className="text-green-600 text-xs font-medium uppercase mb-1">
          {category}
        </p>
        <h2 className="text-lg font-semibold text-gray-800 leading-tight line-clamp-2 mb-2">
          {name}
        </h2>

        <div className="flex items-center gap-1 text-yellow-400 text-sm mb-3">
          ⭐⭐⭐⭐⭐
          <span className="text-gray-400 text-xs ml-1">(120)</span>
        </div>

        <p className="text-gray-500 text-sm mb-4">
          Price per <span className="text-green-600 font-medium">{unit}</span>
        </p>

        {/* Price + Button */}
        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-green-600 font-bold text-xl">£. {price}</p>
            {oldPrice && (
              <p className="text-gray-400 text-sm line-through">
                £. {oldPrice}
              </p>
            )}
          </div>
          <button
            onClick={onAddToCart}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full font-medium hover:bg-green-700 transition"
          >
            <ShoppingCart size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
