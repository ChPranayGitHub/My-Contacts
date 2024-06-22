const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const contacts = require('../models/contactModel');

const getContacts = asyncHandler(async (req, res) => {
    const allContacts = await contacts.find({user_id:req.user.id});
    res.status(StatusCodes.OK).json(allContacts);
});

const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    const user_id = req.user.id;
    if (!name || !email || !phone) {
        const error = new Error("All fields are mandatory");
        error.statusCode = StatusCodes.BAD_REQUEST;
        throw error;
    }
    const contact = await contacts.create({name,email,phone,user_id});
    res.status(StatusCodes.CREATED).json(contact);
});

const getOneContact = asyncHandler(async (req, res) => {
    const contact = await contacts.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!contact) {
        const error = new Error("Contact not found");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }
    res.status(StatusCodes.OK).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    const contact = await contacts.findOneAndUpdate(
        { _id: req.params.id, user_id: req.user.id },
        { name, email, phone },
        { new: true, runValidators: true }
    );
    if (!contact) {
        const error = new Error("Contact not found");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }
    res.status(StatusCodes.OK).json(contact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await contacts.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });
    if (!contact) {
        const error = new Error("Contact not found");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }
    res.status(StatusCodes.OK).json(contact);
});

module.exports = { getContacts, createContact, getOneContact, updateContact, deleteContact };
