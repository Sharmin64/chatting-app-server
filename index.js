import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import OpenAI from "openai";
import openAiRoutes from "./routes/openai.js";
import authRoutes from "./routes/auth.js";

const port = process.env.PORT || 5000;

//configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.get("/", (req, res) => {
  res.send("Chat app started");
});

//Open AI Configuration

export const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

//Routes;
app.use("/openai", openAiRoutes);
app.use("/auth", authRoutes);
//SERVer SetUp

app.listen(port, () => {
  console.log(`Chatting App listening at http://localhost:${port}`);
});
