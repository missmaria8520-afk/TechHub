const express = require("express");
const app = express();

const auth_routes = require("./auth.routes");
const product_routes = require("./product.routes");
const admin_routes = require("./makeadmin.routes");
const forgotpassword_routes = require("./password.routes");
const user_routes = require("./user.routes");
const cart_routes = require("./cart.routes");
const order_routes = require("./order.routes");
const category_routes = require("./category.route");
const stats = require("./stats.route");

app.use("/", forgotpassword_routes);
app.use("/", admin_routes);
app.use("/", product_routes);
app.use("/auth", auth_routes);
app.use("/", user_routes);
app.use("/", admin_routes);
app.use("/cart", cart_routes);
app.use("/orders", order_routes);
app.use("/", category_routes);
app.use("/stats", stats);

module.exports = app;
