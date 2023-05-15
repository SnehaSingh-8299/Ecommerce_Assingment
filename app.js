"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes/order");
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/orders", routes);
/* Error handling */
app.use((error, req, res, next) => {
    console.log(error);
    return res.status(400).send({
        status: 0,
        message: error.message || error
    });
});
/* Listening & Initializing */
server.listen(process.env.PORT, async () => {
    console.log(`Environment:`, process.env.NODE_ENV);
    console.log(`App is running on http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
    require("./config/connection").mongodb();
}); 