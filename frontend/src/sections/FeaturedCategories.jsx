"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import bannerimage from "../assets/tech-banner.jpg";
import { Link, Navigate, useNavigate } from "react-router-dom";

const banners = [
  {
    id: 1,
    title: "Latest Tech & Innovative Gadgets at Great Prices",
    image: bannerimage,
    bg: "bg-blue-50",
  },
  {
    id: 2,
    title: "Upgrade Your Setup with Premium Tech",
    image: bannerimage,
    bg: "bg-indigo-50",
  },
  {
    id: 3,
    title: "The Best Tech Products Online",
    image: bannerimage,
    bg: "bg-cyan-50",
  },
];

export default function FeaturedCategories() {
  const axiosPrivate = useAxiosPrivate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await axiosPrivate.get("/v1/categories");
      console.log(res.data);
      const data = res.data || [];
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center md:text-left"
      >
        Featured Categories
      </motion.h2>

      {/* Categories Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {loading ? (
          <p className="col-span-full text-gray-600 text-center">Loading...</p>
        ) : categories.length === 0 ? (
          <p className="col-span-full text-gray-600 text-center">
            No categories available.
          </p>
        ) : (
          categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/shop?category=${encodeURIComponent(cat.categoryName)}`}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`rounded-xl border bg-green-50 p-4 text-center cursor-pointer hover:shadow-xl transition`}
              >
                <img
                  src={`http://localhost:3001/public/${cat.images[0]}`}
                  alt={cat.categoryName}
                  className="h-16 w-16 mx-auto object-contain mb-3"
                />
                <h4 className="font-semibold text-gray-800">
                  {cat.categoryName}
                </h4>
                <p className="text-gray-500 text-sm">
                  {cat.productCount || 0} items
                </p>
              </motion.div>
            </Link>
          ))
        )}
      </motion.div>

      {/* Promo Banners */}
      <motion.div
        className="w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Pick first banner or any one you want */}
        {banners.length > 0 && (
          <motion.div
            key={banners[1].id}
            variants={{
              hidden: { opacity: 0.5, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className={`rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between ${banners[0].bg} shadow-lg hover:shadow-xl transition`}
          >
            {/* Text */}
            <div className="mb-6 md:mb-0 md:w-1/2">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                {banners[1].title}
              </h3>
              <Link
                to="/shop"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white text-base font-medium px-6 py-3 rounded-full transition"
              >
                Shop Now →
              </Link>
            </div>

            {/* Image */}
            <motion.img
              src={banners[1].image}
              alt={banners[1].title}
              className="h-48 md:h-64 object-contain md:w-auto rounded-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
