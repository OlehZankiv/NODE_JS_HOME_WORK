const contacts = require("./db/contacts.js");
const argv = require("yargs").argv;

const invokeAction = ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      return contacts.listContacts();
    case "get":
      return contacts.getContactById(id);
    case "add":
      return contacts.addContact(name, email, phone);
    case "remove":
      return contacts.removeContact(id);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv).then(console.log);
