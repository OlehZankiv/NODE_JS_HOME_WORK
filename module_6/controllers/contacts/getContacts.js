import { listContacts } from "../../services/contacts.js";
import { getPaginationParams } from "../../utils/pagination.js";

export const getContacts = async (req, res, next) => {
  try {
    res.json({
      contacts: await listContacts(
        req.user._id,
        getPaginationParams(req.query)
      ),
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
