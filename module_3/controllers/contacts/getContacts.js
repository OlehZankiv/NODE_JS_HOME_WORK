import { listContacts } from "../../services/contacts.js";

export const getContacts = async (_, res, next) => {
  try {
    res.json({ contacts: await listContacts() });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
