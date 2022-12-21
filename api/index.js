const express = require("express");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users")
const app = express();
const PORT = 8000 || process.env.PORT;

const mongoose = require("mongoose");
const dotenv = require("dotenv")

dotenv.config();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})
.then(() => console.log("MONGO DB CONNECTED"))
.catch((err) => console.log(err))

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
});