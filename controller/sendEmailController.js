const nodemailer = require("nodemailer");
const asyncWrapper = require("../helper/asyncWrapper");
const sgMail = require("@sendgrid/mail");
const { isEmail } = require("validator");

const sendEmailEthereal = asyncWrapper(async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "zetta.grant9@ethereal.email",
      pass: "tJ727P8GUPfXCMVuPK",
    },
  });

  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" <zetta.grant9@ethereal.email>',
    to: "sanjeet.kumar.nitt@gmail.com",
    subject: "Hello ✔",
    // text: "Hello world?", // plain‑text body
    html: "<h1>Sending Email With Node.Js (Sanjeet)</h1>", // HTML body
  });

  res.status(200).json({ status: "success", data: { info } });
});

const sendEmailWithGmail = asyncWrapper(async (req, res) => {
  const { to, subject, message } = req.body;

  // Validation
  if (!to || !subject || !message) {
    return res.status(400).json({
      status: "error",
      message: "Please provide recipient email, subject, and message",
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to) || !isEmail(to)) {
    return res.status(400).json({
      status: "error",
      message: "Please provide a valid email address",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.FROM_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: to,
      subject: subject,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">📧 Email from Email Composer</h1>
          </div>
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin-bottom: 15px; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 8px;">Subject: ${subject}</h2>
              <div style="white-space: pre-wrap; line-height: 1.6; color: #555; font-size: 16px;">${message}</div>
            </div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e9ecef; text-align: center; color: #666; font-size: 14px;">
              <p>
                This email was sent using the Email Composer application.<br>
                Built with ❤️ using Node.js by Sanjeet Kumar.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    res.status(200).json({
      status: "success",
      message: "Email sent successfully!",
      data: {
        messageId: info.messageId,
        to: to,
        subject: subject,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to send email. Please check your email configuration.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

const sendEmail = asyncWrapper(async (req, res) => {
  const { to, subject, message } = req.body;

  // Validation
  if (!to || !subject || !message) {
    return res.status(400).json({
      status: "error",
      message: "Please provide recipient email, subject, and message",
    });
  }
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: to, // Change to your recipient
    from: process.env.FROM_EMAIL, // Change to your verified sender
    subject: subject,
    text: "and easy to do anywhere, even with Node.js",
    html: `<strong>${message}</strong>`,
  };
  const info = await sgMail.send(msg);
  res.status(200).json({ status: "success", data: { info } });
});

module.exports = {
  sendEmailEthereal,
  sendEmailWithGmail,
  sendEmail,
};
