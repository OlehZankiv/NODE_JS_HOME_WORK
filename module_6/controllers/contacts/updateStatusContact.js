import { responseMessageCreator } from "../../utils/error.js";
import { validateFavoriteContact } from "../../validations/index.js";
import { updateStatusContact as updateStatusContactService } from "../../services/contacts.js";

export const updateStatusContact = async (req, res, next) => {
  try {
    const { favorite } = req.body;

    if (typeof favorite !== "boolean")
      return res
        .status(400)
        .json(responseMessageCreator("missing field favorite"));

    const validation = validateFavoriteContact(favorite);

    if (validation.error?.message)
      return res
        .status(400)
        .json(responseMessageCreator(validation.error.message));

    const updatedContact = await updateStatusContactService(
      req.params.contactId,
      {
        favorite,
      }
    );

    if (updatedContact) res.json(updatedContact);
    else res.status(404).json(responseMessageCreator("Not found"));
  } catch (e) {
    console.error(e);
    next(e);
  }
};
