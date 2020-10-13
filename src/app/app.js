const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const {NODE_ENV} = require("../../config");
const {requireAuth} = require("../middleware/jwtAuth");

//Import routes here ordered by user story board
const RegisterRouter = require("../routes/RegisterRouter/RegisterRouter");
const LoginRouter = require("../routes/LoginRouter/LoginRouter");
const MenuItemsRouter = require("../routes/MenuItemsRouter/MenuItemsRouter");
const ItemIngredientsRouter = require("../routes/ItemIngredientsRouter/ItemIngredientsRouter");
const OrderItemsRouter = require("../routes/OrderItemsRouter/OrderItemsRouter");
const OrdersRouter = require("../routes/OrdersRouter/OrdersRouter");
const UserRouter = require("../routes/UserRouter/UserRouter");

app.use(morgan((NODE_ENV === "production") ? "tiny" : "common"));
app.use(cors());
app.use(express.json());
app.use(helmet());

//Routes start here

app.use("/api", RegisterRouter);
app.use("/api", LoginRouter);
app.use("/api", MenuItemsRouter)
app.use("/api", ItemIngredientsRouter);

//Routes after this middleware will require authorization
app.use("/api", OrdersRouter);
app.use("/api", OrderItemsRouter);
app.use("/api", UserRouter);

app.use(function errorHandler(error, req, res, next) {
    let response;

    if (NODE_ENV === 'production') {
      response = { error: 'Server error' };
    } else {
      console.error(error)
      response = { error: error.message, object: error };
    };

    res.status(500).json(response);
});

module.exports = app;