import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="container mx-auto mt-4 px-4 py-20 lg:pt-40">
      {/* Hero Section */}
      <div className="relative bg-[url('/images/market-hero.jpg')] bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden">
        <div className="bg-black/50 flex flex-col items-center text-center py-32 px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            About TechHub
          </motion.h1>
          <div className="w-20 h-1 bg-blue-400 mb-6"></div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-200 max-w-2xl"
          >
            Bringing cutting-edge technology and innovative gadgets to your
            doorstep since 2015.
          </motion.p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-20 border-t border-gray-300"></div>

      {/* Our Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold text-blue-700 mb-6">Our Story</h2>
          <p className="text-gray-700 mb-4">
            TechHub began with a simple idea: to create a technology store
            that makes cutting-edge gadgets accessible to everyone. In 2015, founders Alex Johnson and 
            Lisa Park noticed their community lacked a store offering quality tech products 
            at reasonable prices with expert guidance.
          </p>
          <p className="text-gray-700 mb-4">
            What started as a small electronics shop has grown into a trusted tech retailer
            serving communities nationwide. Despite our growth, we've
            maintained our commitment to quality, innovation, and expert customer service.
          </p>
          <p className="text-gray-700">
            Through partnerships with leading tech brands and emerging startups, we've
            created a shopping experience that celebrates both established technology and 
            breakthrough innovations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-lg overflow-hidden shadow-xl"
        >
          <img
            src="/images/store-photo.jpg"
            alt="Store"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Divider */}
      <div className="my-20 border-t border-gray-300"></div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {["Our Mission", "Our Vision"].map((title, idx) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-blue-50 p-8 rounded-lg shadow"
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-4">{title}</h2>
            <p className="text-gray-700">
              {title === "Our Mission"
                ? "To provide communities with access to the latest technology and innovative products while offering expert guidance and exceptional customer support."
                : "To be the preferred technology destination that transforms shopping into an inspiring experience, fostering digital innovation and connecting people with technology that enhances their lives."}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="my-20 border-t border-gray-300"></div>

      {/* Our Values */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {["Innovation", "Quality", "Support", "Trust"].map(
            (title, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg hover:-translate-y-2 transform transition"
              >
                <div className="text-4xl mb-4">
                  {idx === 0
                    ? "💡"
                    : idx === 1
                    ? "⭐"
                    : idx === 2
                    ? "🎧"
                    : "🔒"}
                </div>
                <h3 className="text-xl font-bold text-blue-700 mb-2">
                  {title}
                </h3>
                <p className="text-gray-700">
                  {/* Short description for each value */}
                  {title === "Innovation"
                    ? "We embrace cutting-edge technology."
                    : title === "Quality"
                    ? "We select only premium tech products."
                    : title === "Support"
                    ? "We provide expert customer assistance."
                    : "We build reliable, lasting relationships."}
                </p>
              </motion.div>
            )
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="my-20 border-t border-gray-300"></div>

      {/* Meet the Team */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            "Alex Johnson",
            "Lisa Park",
            "David Kim",
            "Sarah Williams",
          ].map((name, idx) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow hover:shadow-2xl transform hover:-translate-y-2 transition overflow-hidden"
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-600 italic">[Photo]</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-700">{name}</h3>
                <p className="text-blue-600 mb-2">
                  {name === "Alex Johnson"
                    ? "Co-Founder & CEO"
                    : name === "Lisa Park"
                    ? "Co-Founder & CTO"
                    : name === "David Kim"
                    ? "Head of Product Innovation"
                    : "Customer Experience Manager"}
                </p>
                <p className="text-gray-700">
                  {name === "Alex Johnson"
                    ? "Passionate about making technology accessible to all."
                    : name === "Lisa Park"
                    ? "Bringing 15+ years of tech industry expertise."
                    : name === "David Kim"
                    ? "Discovering and testing the latest tech innovations."
                    : "Ensuring every customer has an amazing experience."}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      {/* <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-green-600 text-white rounded-lg p-8 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Come Visit Us Today!</h2>
        <p className="text-xl mb-6">
          Experience the TechHub difference at any of our locations.
        </p>
        <button className="bg-white text-green-700 px-8 py-3 rounded-lg font-bold hover:bg-green-100 transition">
          <span className="inline-flex items-center">📍 Find Your Store</span>
        </button>
      </motion.div> */}
    </div>
  );
};

export default About;
