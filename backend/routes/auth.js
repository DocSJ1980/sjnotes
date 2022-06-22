const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "SJis@goodMan";

//FIRST ROUTE: Create a user using: POST "/api/auth/createuser" Does not require auth
router.post("/createuser",  [
    body("name", "Please enter a valid name").isLength({ min: 3 }),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters long.").isLength({min: 5,}),
        ], async (req, res) => {
            //If there are errors, return bad reqquest aand the rrors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }
        try {
        //Check whether the user with the same email exisits
            let user = await User.findOne({ email: req.body.email });
                if (user) {
                    return res .status(400) .json({ error: "Sorry a user with this email already exists" });
                }
            const salt = await bcrypt.genSalt(10);
            secPass = await bcrypt.hash(req.body.password, salt);

        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user: {
            id: user.id
            },
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
      

            //res.json(user)
            res.json({authtoken})
            
            } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
            }
    })


//2ND ROUTE: Authenticate a user using: POST "/api/auth/login" Does not require auth
router.post('/login', [
        body("email", "Please enter a valid email").isEmail(),
        body("password", "Password cannot be blank").exists(),
    ], async (req, res) => {
    
        //If there are errors, return bad reqquest aand the rrors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const {email, password} = req.body;
        try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({error:"Please try to login with correct credentials"});
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                return res.status(400).json({error:"Please try to login with correct credentials"})
        }

        const data = {
            user: {
            id: user.id,
            }
            }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken});
        
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }


    })


//3RD ROUTE: Get loggedin User details: POST "/api/auth/getuser" Login required
router.post('/getuser', fetchuser, async (req, res) => {
try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user) 
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})
module.exports = router
