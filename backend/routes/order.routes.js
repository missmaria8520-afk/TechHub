const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isloggedin");
const isadmin = require("../middleware/isadmin");
const {
  cancelOrder,
  getOrders,
  getAllOrders,
  changeOrderStatus,
} = require("../controller/order.controller");

// Route to cancel an order
router.delete("/cancel/:orderId", isLoggedIn, cancelOrder);

// Route to get all orders for the logged-in user
router.get("/myorders", isLoggedIn, getOrders);

router.get("/getallorder", isLoggedIn, isadmin, getAllOrders);

router.put("/change-status/:orderId", isLoggedIn, isadmin, changeOrderStatus);

module.exports = router;
