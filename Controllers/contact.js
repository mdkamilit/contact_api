import { Contact } from "../Models/Contact.js";

// create new contact

export const newContact = async (req, res) => {
  const { name, email, phone, type } = req.body;
  if (!name || !email || !phone || !type) 
    return res.json({ mesg: "All fields are required", success: false });
 
    const saveContact = await Contact.create({
      name,
      email,
      phone,
      type,
      user:req.user
    });
  
  res.status(201).json({ mesg: "Contact created",saveContact, success: true });
};

export const getAllContacts = async (req, res) => {
  let userContact = await Contact.find();
  if (!userContact) return res.json({ msg: "User not exists", success: false });
  res.json({ msg: "All Contacts fecthed", success: true, userContact });
};

export const getAllContactById = async (req, res) => {
  const id = req.params.id;
  const userContact = await Contact.findById(id);
  if (!userContact)
    return res.json({ msg: "No contact found!", success: false });
  res.json({ msg: "Contact fetched", userContact, success: true });
};

// update contact by id

export const updateContactById = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, type } = req.body;
  let updatedContact = await Contact.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
      type,
    },
    // new agr new fields ko send krta hai to wo bhi update ho jana chahye
    { new: true }
  );
  if (!updatedContact)
    return res.json({ msg: "No contacts exists", success: false });
  res.json({ mesg: "updated Contact saved", updatedContact, success: true });
};

// delete contact by id

export const deleteContactById = async (req, res) => {
  const id = req.params.id;

  let deletByContactID = await Contact.findByIdAndDelete(id);
  if (!deletByContactID)
    return res.json({ msg: "No contacts exists", success: false });
  res.json({ mesg: "Deleted Contact successfully", deletByContactID, success: true });
};

// get contact by user id

export const getContactByUserId = async (req, res) => {
  const id = req.params.id;


  let userContact = await Contact.find({user:id});
  if (!userContact)
    return res.json({ msg: "No contacts exists", success: false });
  res.json({ mesg: "getuser  Contact successfully", userContact, success: true });
};

// write a function return promise 












