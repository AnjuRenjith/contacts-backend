const asyncHandler = require('express-async-handler');
const mongoose= require("mongoose");
const Contact = require('../models/contactModel');
//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler( async (req,res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});
//@desc Get contact
//@route Get /api/contacts/:id
//@access public
const getContact = asyncHandler (async(req,res) =>{
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) {;
            res.status(400);
            throw new Error('Invalid Contact ID');
        };
        const contact = await Contact.findById(req.params.id);             
        if(!contact){      
            res.status(404);
            throw new Error('Contact not found');
        }
        res.status(200).json(contact);
   
});

//@desc Create contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler( async(req,res) =>{
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const contact = await Contact.create({
        name, email, phone
    });

    res.status(201).json(contact);
});
//@desc update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler (async(req,res) =>{
    try{
        const contact = await Contact.findByIdAndUpdate(req.params.id,req.body, {new:true});  
        if(!contact){                    
            res.status(404);
            throw new Error('Contact not found');
        }
        res.status(200).json(contact);
    }catch(err){
        if(err.name === 'CastError') {
            res.status(404);
            throw new Error('Contact not found');
        }
        throw err     
    }  
});

//@desc delete contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler (async(req,res) =>{
    try{
        const contact = await Contact.findByIdAndDelete(req.params.id);  
        if(!contact){                    
            res.status(404);
            throw new Error('Contact not found');
        }
        res.status(200).json(contact);
    }catch(err){
        if(err.name === 'CastError') {
            res.status(404);
            throw new Error('Contact not found');
        }
        throw err     
    }  
});


module.exports = { 
    getContacts, 
    getContact, 
    createContact, 
    updateContact, 
    deleteContact };