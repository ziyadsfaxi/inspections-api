import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import mongoose from "mongoose";
import bluebird from "bluebird";
import cors from "cors";
import { MONGODB_URI } from "./util/secrets";
import responseSuccessErrorOverride from "./middlewares/responseSuccessErrorOverride.middleware";
import apiRouter from "./routes/index";

// Create Express server
const app = express();

app.use(cors());

app.use(responseSuccessErrorOverride);

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

const routingPoint = "/api/";
app.use(routingPoint, apiRouter);

export default app;
