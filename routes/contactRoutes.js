const express = require('express');
const {getContacts,createContact, getOneContact,updateContact, deleteContact} = require('../controllers/contactController');
const validateToken = require('../middlewares/validateTokenHandler');
const router = express.Router();

router.get('/',validateToken,getContacts);
router.post('/',validateToken,createContact);
router.get('/:id',validateToken,getOneContact);
router.put('/:id',validateToken,updateContact);
router.delete('/:id',validateToken,deleteContact);


module.exports = router;