// routes/user.routes.js
const express = require("express");
const {
  getAllCustomers,
  getCustomerByEmail,
  updateUser,
} = require("../controller/user.controller");
const isLoggedIn = require("../middleware/isloggedin");
const isAdmin = require("../middleware/isadmin");

const router = express.Router();

// Admin-only routes:
router.get("/customers", isLoggedIn, isAdmin, getAllCustomers);
router.get("/customer/:email", getCustomerByEmail);

// Route to update a user (only the logged-in user can update their own data)
router.put("/user/:email", isLoggedIn, updateUser);
module.exports = router;
