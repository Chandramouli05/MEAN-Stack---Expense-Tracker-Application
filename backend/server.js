require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const expenseRoutes = require("./routes/expenseRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/expenses", expenseRoutes);


const PORT = process.env.PORT || 3500;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB is Connected");
    app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection Error", err);
  });
