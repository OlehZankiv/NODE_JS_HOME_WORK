import { Contact } from "../models/index.js";

export const listContacts = (userId, pagination) => {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const users = Contact.find({ owner: userId });

  if (!pagination.page || !pagination.limit) return users;

  const { page, limit } = pagination;

  return users.skip((page - 1) * limit).limit(limit);
};

export const getContactById = (contactId) => Contact.findById(contactId);

export const removeContact = (contactId) =>
  Contact.findByIdAndDelete(contactId);

export const addContact = (body) => Contact.create(body);

export const updateContact = (contactId, body) =>
  Contact.findByIdAndUpdate(contactId, body, { new: true });

export const updateStatusContact = (contactId, body) =>
  Contact.findByIdAndUpdate(contactId, { $set: body }, { new: true });
