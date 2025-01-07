const nodemailer = require("nodemailer");
const config = require("../config/config");
const logger = require("../config/logger");

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== "test") {
  transport
    .verify()
    .then(() => logger.info("Connected to email server"))
    .catch((err) =>
      logger.warn(
        "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
      )
    );
}


const sendEmail = async (to, subject, html) => {
  const msg = { from: config.email.from, to, subject, html };
  await transport.sendMail(msg);
};

const sendEmailVerification = async (to, otp) => {
  console.log("sendEmailVerification", to, otp);
  const subject = "User verification code";
  const html = `

  <body style="background-color: #f3f4f6; padding: 1rem; font-family: Arial, sans-serif;">
    <div style="max-width: 24rem; margin: 0 auto; background-color: #fff; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Welcome to Spotlyt Task App</h1>
      <p style="color: #4b5563; margin-bottom: 1rem;">Thank you for joining Spotlyt Task App. Your account is almost ready!</p>
      <div style="background-color: #e5e7eb; padding: 1rem; border-radius: 0.25rem; text-align: center; font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">${otp}</div>
      <p style="color: #4b5563; margin-bottom: 1rem;">Enter this code to verify your account.</p>
      <p style="color: red; font-size: 0.8rem; margin-top: 1rem;">This code expires in <span id="timer">3:00</span> minutes.</p>
    </div>
</body>
`;
  await sendEmail(to, subject, html);
};

const sendResetPasswordEmail = async (to, otp) => {
  console.log("Password Reset Email", to, otp);
  const subject = "Password Reset Email";
  const html = `
  <body style="background-color: #f3f4f6; padding: 1rem; font-family: Arial, sans-serif;">
  <div style="max-width: 24rem; margin: 0 auto; background-color: #fff; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1;">
    <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Password Reset</h1>
    <p style="color: #4b5563; margin-bottom: 1rem;">You have requested a password reset. Here is your reset code:</p>
    <div style="background-color: #e5e7eb; padding: 1rem; border-radius: 0.25rem; text-align: center; font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">${otp}</div>
    <p style="color: #4b5563; margin-bottom: 1rem;">Please enter this code to reset your password.</p>
    <p style="color: red; margin-bottom: 1rem;">This code is valid for 3 minutes.</p>
  </div>
</body>
`;
  await sendEmail(to, subject, html);
};


const sendVerificationEmail = async (to, token) => {
  const subject = "Email Verification";
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendEmailVerification,
};
