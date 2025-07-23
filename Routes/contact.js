import express from 'express'
import { deleteContactById, getAllContactById, getAllContacts, getContactByUserId, newContact, updateContactById } from '../Controllers/contact.js';
import { isAuthenticated } from '../Middleware/Auth.js';
const contactRouter=express.Router();

//new contact
contactRouter.post('/new',isAuthenticated,newContact)

//get all contacts
contactRouter.get('/',getAllContacts)

// fetch contact by Id
contactRouter.get('/:id',getAllContactById)

//update contact by id
 contactRouter.put('/:id',isAuthenticated,updateContactById)

 //delete contact by id
 contactRouter.delete('/:id',deleteContactById)

  //get user specific  by id
 contactRouter.get('/userid/:id',getContactByUserId)

export default contactRouter