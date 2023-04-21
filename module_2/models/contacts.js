import fs from "fs/promises";
import { contactsPath } from "../utils/path.js";

export const listContacts = async () => {
  let contacts = [];

  try {
    contacts = JSON.parse(await fs.readFile(contactsPath));
  } catch (e) {
    console.error(e);
  }

  return contacts;
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  let deletedContact = null;

  await fs.writeFile(
    contactsPath,
    JSON.stringify(
      contacts.filter((contact) => {
        if (contact.id === contactId) {
          deletedContact = contact;
          return false;
        }
        return true;
      }),
      null,
      2
    )
  );

  return deletedContact;
};

export const addContact = async (body) =>
  fs.writeFile(
    contactsPath,
    JSON.stringify([...(await listContacts()), body], null, 2)
  );

export const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  let updatedContact = null;

  await fs.writeFile(
    contactsPath,
    JSON.stringify(
      contacts.map((contact) => {
        if (contact.id === contactId) {
          updatedContact = { ...contact, ...body };
          return updatedContact;
        }
        return contact;
      }),
      null,
      2
    )
  );

  return updatedContact;
};
