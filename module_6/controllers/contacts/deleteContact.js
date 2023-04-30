import { responseMessageCreator } from "../../utils/error.js";
import { removeContact } from "../../services/contacts.js";

export const deleteContact = async (req, res, next) => {
  try {
    const deletedContact = await removeContact(req.params.contactId);

    if (deletedContact) res.json(responseMessageCreator("contact deleted"));
    else res.status(404).json(responseMessageCreator("Not found"));
  } catch (e) {
    console.error(e);
    next(e);
  }
};
