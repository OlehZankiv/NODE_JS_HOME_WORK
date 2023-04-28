import { responseMessageCreator } from "../../utils/error.js";
import { validateContact } from "../../validations/index.js";
import { updateContact as updateContactService } from "../../services/contacts.js";

export const updateContact = async (req, res, next) => {
  try {
    const { email, name, phone } = req.body;

    if ([email, name, phone].some((field) => !field))
      return res.status(400).json(responseMessageCreator("missing fields"));

    const validation = validateContact(req.body);

    if (validation.error?.message)
      return res
        .status(400)
        .json(responseMessageCreator(validation.error.message));

    const updatedContact = await updateContactService(req.params.contactId, {
      email,
      name,
      phone,
    });

    if (updatedContact) res.json(updatedContact);
    else res.status(404).json(responseMessageCreator("Not found"));
  } catch (e) {
    console.error(e);
    next(e);
  }
};
