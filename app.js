const express = require("express");
const apiRouter = require("./backend/routes/api.route");
const orderRouter = require("./backend/routes/order.route");
const categoryRouter = require("./backend/routes/category.route");
const authRouter = require("./backend/routes/auth.route");
const cors = require("cors");
const app = express();
const connectDB = require("./backend/_utils/connectDb");

//Connect to DB
connectDB();

app.use(cors());

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json

const serverConfig = require("./backend/_config/serverConfig");

console.log(serverConfig, serverConfig.backendPort);

const port = serverConfig.backendPort;
app.use("/api", apiRouter);
app.use("/order", orderRouter);
app.use("/category", categoryRouter);
app.use("/auth", authRouter);
app.use("/backend/images", express.static("backend/images"));

app.listen(port, () => console.log(`listening port ${port}`));
