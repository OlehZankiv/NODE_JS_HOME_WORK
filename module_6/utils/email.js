import sgMail from "@sendgrid/mail";

import { EMAIL_TOKEN, SENDER_EMAIL_LOGIN } from "./constants.js";

sgMail.setApiKey(EMAIL_TOKEN);

export const sendEmail = (to, subject, text) =>
  sgMail.send({
    from: SENDER_EMAIL_LOGIN,
    to,
    subject,
    text,
  });
