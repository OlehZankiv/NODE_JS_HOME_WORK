const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  return contacts.find((contact) => contact.id === contactId) || null;
};

const removeContact = async (contactId) => {
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

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();

  const randomId =
    Math.random().toString(16).substring(2) +
    Math.random().toString(16).substring(2);

  const newContact = { id: randomId, name, email, phone };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
