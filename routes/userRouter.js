const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require ("../models/userModel");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    try {
        const {email, password, passwordCheck, name, surname} = req.body;

        // validate

        if (!email || !password || !passwordCheck || !name || !surname)
            return res.status(400).json({msg: "Not all fields have been entered."});
        if (password.length < 5)
            return res
                .status(400)
                .json({msg: "The password needs to be at least 5 characters long."});
        if (password !== passwordCheck) 
            return res
                .status(400)
                .json({msg: "Enter the same password twice for verification."});

        const existingUser = await User.findOne({email: email});

        if (existingUser) {
            return res
                .status(400)
                .json({msg: "An account with this email already exists."});
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: passwordHash,
            name,
            surname
        });

        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
    
});

router.post("/login", async (req, res) =>  {
    try {
        const {email, password} = req.body;

        // validate
        if (!email || !password) 
            return res.status(400).json({msg: "Not all fields have been entered."});
    
        const user = await User.findOne({ email: email });

        if (!user) 
            return res
            .status(400)
            .json({msg: "No account with this email has been registered"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg: "Invalid credentials."});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email
            },
        })
        console.log(token);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

module.exports = router;