import express from "express";
import cors from "cors"; //for stable connection it is a middleware
import authRoute from "./routes/auth";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", authRoute);
const PORT = process.env.PORT || 300;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
