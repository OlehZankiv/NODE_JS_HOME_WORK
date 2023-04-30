import { responseMessageCreator } from "../../utils/error.js";
import { validateUser } from "../../validations/index.js";
import { v4 } from "uuid";

import {
  getUserByEmail as getUserByEmailService,
  registerUser as registerUserService,
} from "../../services/users.js";
import { sendEmail } from "../../utils/email.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const verificationToken = v4();
    const newUser = { email, password, verificationToken };

    const validation = validateUser(newUser);

    if (validation.error?.message)
      return res
        .status(400)
        .json(responseMessageCreator(validation.error.message));

    const user = await getUserByEmailService(email);
    await sendEmail(
      email,
      "User verification",
      `
        <div>
            <h3>Hello you've registered user by using this email: ${email}</h3>
            <p>Please use <a href="http://localhost:3000/api/users/verify/${verificationToken}">this link</a> to verify your user</p>
        </div>
    `
    );

    if (user)
      return res.status(409).json(responseMessageCreator("Email in use"));

    const createdUser = await registerUserService(newUser);

    res.status(201).json({ createdUser });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
