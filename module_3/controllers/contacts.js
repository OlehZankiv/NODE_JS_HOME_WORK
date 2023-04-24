import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} from "../services/contacts.js";
import { responseMessageCreator } from "../utils/error.js";
import { validateContact } from "../utils/validations.js";

export const getContactsContoller = async (_, res, next) => {
  try {
    res.json({ contacts: await listContacts() });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const getContactContoller = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);

    if (contact) res.json(contact);
    else res.status(404).json(responseMessageCreator("Not found"));
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const { email, name, phone } = req.body;

    if ([email, name, phone].some((field) => !field))
      return res
        .status(400)
        .json(responseMessageCreator("missing required name field"));

    const newContact = { email, name, phone };

    const validation = validateContact(newContact);

    if (validation.error?.message)
      return res
        .status(400)
        .json(responseMessageCreator(validation.error.message));

    const createdContact = await addContact(newContact);

    res.status(201).json(createdContact);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const deletedContact = await removeContact(req.params.contactId);

    if (deletedContact) res.json(responseMessageCreator("contact deleted"));
    else res.status(404).json(responseMessageCreator("Not found"));
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const updateContactController = async (req, res, next) => {
  try {
    const { email, name, phone } = req.body;

    if ([email, name, phone].some((field) => !field))
      return res.status(400).json(responseMessageCreator("missing fields"));

    const updatedContact = await updateContact(req.params.contactId, {
      email,
      name,
      phone,
    });

    const validation = validateContact(updatedContact);

    if (validation.error?.message)
      return res
        .status(400)
        .json(responseMessageCreator(validation.error.message));

    if (updatedContact) res.json(updatedContact);
    else res.status(404).json(responseMessageCreator("Not found"));
  } catch (e) {
    console.error(e);
    next(e);
  }
};
