import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_SMTP_USER,
    pass: process.env.EMAIL_SMTP_PASSWORD
  }
});
