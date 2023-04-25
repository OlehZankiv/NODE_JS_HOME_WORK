import { responseMessageCreator } from "../../utils/error.js";
import { getContactById } from "../../services/contacts.js";

export const getContact = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);

    if (contact) res.json(contact);
    else res.status(404).json(responseMessageCreator("Not found"));
  } catch (e) {
    console.error(e);
    next(e);
  }
};
