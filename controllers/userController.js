const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
//@desc Register user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler( async (req,res) => {
    const {username, email, password} = req.body;
    
    if(!username || !email || !password){        
        res.statusCode = 400;
        throw new Error("All fields are mandatory");
    }
    const userExists = await User.findOne({email});
    if (userExists){            
        res.statusCode = 400;
        throw new Error ("Email id already registered.");      
    }
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    });
    if(user){
        res.status(201).json({_id:user.id, email:user.email});
    }else{
        res.status = 400;
        throw new Error("User data is not valid");
    }    
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler( async (req,res) => {
    const {email , password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error('E-mail id and password is required');
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email:user.email,
                id:user._id,
            },
            
        },
        process.env.ACCESS_SECRET_TOKEN,
        {expiresIn:"15m"});
        res.status(200).json({accessToken});

    }else{
        res.status(401);
        throw new Error("Invalid email or password");
    }
    
});

//@desc current user
//@route POST /api/users/login
//@access private
const currentUser = asyncHandler( async (req,res) => {
    res.json(req.user);
});


module.exports = {registerUser , loginUser, currentUser};