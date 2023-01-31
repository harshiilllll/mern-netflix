const express = require("express");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const app = express();
const PORT = 8000 || process.env.PORT;
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
app.use(cors());

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log("MONGO DB CONNECTED"))
  .catch((err) => console.log(err));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);
app.use(cors());

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
