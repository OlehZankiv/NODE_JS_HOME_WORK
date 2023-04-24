import { responseMessageCreator } from "../../utils/error.js";
import { validateContact } from "../../utils/validations.js";
import { addContact } from "../../services/contacts.js";

export const createContact = async (req, res, next) => {
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
