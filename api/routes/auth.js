const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    });

    try {
        const user = await newUser.save();
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

//LOGIN
router.post("login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        !user && res.status(401).json("Wrong username or password");

        const originalPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password && res.status(401).json("Wrong username or password");

        res.status(200).json(user)

    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;