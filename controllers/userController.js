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
            
        })
        res.status(200).json({accessToken});

    }
    res.json({message:"login user"});
});

//@desc current user
//@route POST /api/users/login
//@access private
const currentUser = asyncHandler( async (req,res) => {
    res.json({message : 'Current user'});
});


module.exports = {registerUser , loginUser, currentUser};