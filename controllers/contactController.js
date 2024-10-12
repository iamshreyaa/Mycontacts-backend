const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Contact = require("../models/contactModels");
//give label for api methods : CRUD
//@desc Get all contacts
//@route GET /api/conntacts
//@access private

const getContacts = asyncHandler(async (req,res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

//give label for api methods : CRUD
//@desc Create new contacts
//@route POST /api/contacts
//@access private

//status 201 means created
const CreateContact = asyncHandler(async (req,res) => {
    console.log("the req body is",req.body);
    const {name,email,phone} = req.body;

    if (!name || !email || !phone){
        res.status(400);
        throw new Error("all field mandatory");
    } 
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id,
    });
    res.status(201).json(contact);
});

// @desc    Get a single contact by ID
// @route   GET /api/contacts/:id
// @access  private
const getContact = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid contact ID format");
    }

    console.log("Fetching contact with ID:", id);

    const contact = await Contact.findById(id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact);
});


//@desc update new contacts
//@route PUT /api/contacts/:id
//@access private

const UpdateContact = asyncHandler(async (req,res) => {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("user don't have permission to update other user contacts");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
});

//@desc delete new contacts
//@route DELETE /api/contacts/:id
//@access private

const DeleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("user don't have permission to delete other user contacts");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contact deleted", contact });
});


module.exports = {getContacts, 
    CreateContact,
    getContact,
    UpdateContact,
    DeleteContact};