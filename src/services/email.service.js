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
  <body style="background-color: #f3f4f6; padding: 2rem; font-family: Arial, sans-serif; color: #333;">
    <div
        style="max-width: 32rem; margin: 0 auto; background-color: #ffffff; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); text-align: center;">
        <img src="https://raw.githubusercontent.com/shadat-hossan/Image-server/refs/heads/main/NEXMOTAG.jpeg"
            alt="NEXMO TAG" style="max-width: 10rem; margin-bottom: 1.5rem;">
        <h1 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem; color: #1f2937;">Welcome to NEXMO TAG
        </h1>
        <p style="color: #4b5563; margin-bottom: 1.5rem;">Thank you for joining NEXMO TAG! Your account is almost
            ready.</p>
        <div
            style="background: linear-gradient(135deg, #3b82f6, #06b6d4); color: #ffffff; padding: 1rem; border-radius: 0.5rem; font-size: 2rem; font-weight: 800; letter-spacing: 0.1rem; margin-bottom: 1.5rem;">
            ${otp}
        </div>
        <p style="color: #4b5563; margin-bottom: 1.5rem;">Collect this code to verify your account.</p>
        <p style="color: #ff0000; font-size: 0.85rem; margin-top: 1.5rem;">This code expires in <span
                id="timer">3:00</span>
            minutes.</p>
        <a href="https://shadat-hossain.netlify.app" style="color: #888; font-size: 12px; text-decoration: none;"
            target="_blank">ᯤ
            Develop by ᯤ</a>
    </div>
`;
  await sendEmail(to, subject, html);
};

const sendResetPasswordEmail = async (to, otp) => {
  console.log("Password Reset Email", to, otp);
  const subject = "Password Reset Email";
  const html = `
      <body style="background-color: #f3f4f6; padding: 2rem; font-family: Arial, sans-serif; color: #333;">
          <div
              style="max-width: 32rem; margin: 0 auto; background-color: #ffffff; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); text-align: center;">
              <img src="https://raw.githubusercontent.com/shadat-hossan/Image-server/refs/heads/main/NEXMOTAG.jpeg"
                  alt="NEXMO-TAG" style="max-width: 8rem; margin-bottom: 1.5rem;">
              <h1 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem; color: #1f2937;">Password Reset Request
              </h1>
              <p style="color: #4b5563; margin-bottom: 1.5rem;">You requested a password reset for your account. Use the code
                  below to reset your password:</p>
              <div
                  style="background: linear-gradient(135deg, #3d56ad, #0032D3); color: #ffffff; padding: 1rem; border-radius: 0.5rem; font-size: 2rem; font-weight: 800; letter-spacing: 0.1rem; margin-bottom: 1.5rem;">
                  ${otp}
              </div>
              <p style="color: #d6471c; margin-bottom: 1.5rem;">Collect this code to reset your password. This code is valid
                  for
                  3
                  minutes.</p>
              <p style="color: #6b7280; font-size: 0.875rem; margin-top: 1.5rem;">If you did not request a password reset,
                  please ignore this email.</p>
              <a href="https://shadat-hossain.netlify.app" style="color: #888; font-size: 12px; text-decoration: none;"
                  target="_blank">ᯤ
                  Develop by ᯤ</a>
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
