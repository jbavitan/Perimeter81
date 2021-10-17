const router = require('express').Router();
const User = require("../Models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post("/register", async (req, res) => {
    try {
        const { fullName, password } = req.body;

        if (!(password && fullName)) { 
            res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({ fullName });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            password: encryptedPassword,
        });

        const token = jwt.sign(
            { user_id: user._id },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        user.token = token;

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json(`Error occured: ${error}`);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { fullName, password } = req.body;

        if (!(fullName && password)) {
            res.status(400).send("All input is required");
        }
        const user = await User.findOne({ fullName });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, fullName },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            user.token = token;
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (error) {
        res.status(400).json(`Error occured: ${error}`);
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).json(`Error occured: ${error}`);
    }
})

router.get('/:fullName', async (req, res) => {
    try {
        const user = await User.findOne({ fullName: req.params.fullName });
        res.json(user);
    } catch (error) {
        res.status(400).json(`Error occured: ${error}`);
    }
})

// router.post("/add", async (req, res) => {
//     try {
//         const { fullName, password } = req.body;

//         const newUser = new User({
//             fullName,
//             password
//         });

//         const savedUser = await newUser.save();
//         res.json(savedUser);
//     } catch (error) {
//         res.status(400).json(`Error occured: ${error}`);
//     }
// });

module.exports = router;