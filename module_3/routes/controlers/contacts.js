import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} from "../../models/contacts.js";
import { responseMessageCreator } from "../../utils/error.js";
import { generateRandomId } from "../../utils/id.js";
import { validateContact } from "../../utils/validations.js";

export const getContactsContoller = async (_, res) =>
  res.json({ contacts: await listContacts() });

export const getContactContoller = async (req, res) => {
  const contact = await getContactById(req.params.contactId);

  if (contact) res.json(contact);
  else res.status(404).json(responseMessageCreator("Not found"));
};

export const createContactController = async (req, res) => {
  const { email, name, phone } = req.body;

  if ([email, name, phone].some((field) => !field))
    return res
      .status(400)
      .json(responseMessageCreator("missing required name field"));

  const newContact = {
    email,
    name,
    phone,
    id: generateRandomId(),
  };

  const validation = validateContact(newContact);

  if (validation.error?.message)
    return res
      .status(400)
      .json(responseMessageCreator(validation.error.message));

  await addContact(newContact);

  res.status(201).json(newContact);
};

export const deleteContactController = async (req, res) => {
  const deletedContact = await removeContact(req.params.contactId);

  if (deletedContact) res.json(responseMessageCreator("contact deleted"));
  else res.status(404).json(responseMessageCreator("Not found"));
};

export const updateContactController = async (req, res) => {
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
};
