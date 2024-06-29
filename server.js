require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const timeout = require("connect-timeout");
const axios = require("axios");
const cron = require("node-cron");
const userRoutes = require("./routes/users");
const companyRoutes = require("./routes/companies");
const announcmentsRoutes = require("./routes/announcements");
const assetsRoutes = require("./routes/assets");
const workspaceRoutes = require("./routes/work_space");
const boardRoutes = require("./routes/boards");
const fs = require("fs");
const Users = require("./models/users");
const configurationRoutes = require("./routes/configuration");
const stageRoutes = require("./routes/stages");
const redis = require("ioredis");
const assetsInfoRoutes = require("./routes/assetsInfo");
const redisRoutes = require("./routes/redis");
const onboardings = require("./routes/onboardings");
const offboardings = require("./routes/offboardings");
const port = 8000;
const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("database connected"));

app.use(cors());
app.use(bodyParser.json());
// app.use(cookieParser());
app.options("*", cors());
app.use(timeout("60s"));
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

app.use("/users", userRoutes);
app.use("/assets", assetsRoutes);
app.use("/companies", companyRoutes);
app.use("/announcement", announcmentsRoutes);
app.use("/work_space", workspaceRoutes);
app.use("/boards", boardRoutes);
app.use("/config", configurationRoutes);
app.use("/stages", stageRoutes);
app.use("/assetsInfo", assetsInfoRoutes);
app.use("/redis", redisRoutes);
app.use("/onboardings", onboardings);
app.use("/offboardings", offboardings);

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
