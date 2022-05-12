import express from "express";
import cors from "cors";
import movies from "./api/movies.route.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.use("/api/v1/movies", movies);
app.use("*", (req, res) => {
  res.status(401).json({ error: "Not found" });
});
export default app;
