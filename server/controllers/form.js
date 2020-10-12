const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.contactForm = async (req, res, next) => {
  const { email, name, message } = req.body;

  try {
    const emailData = {
      to: process.env.EMAIL_TO,
      from: email,
      subject: `Contact from - ${process.env.APP_NAME}`,
      text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
      html: `
        <h4>Email received from contact form:</h4>
        <p>Sender name: ${name}</p>
        <p>Sender email: ${email}</p>
        <p>Sender message: ${message}</p>
        <hr/>
        <p>This email may contain sensitive information</p>
      `,
    };

    await sgMail.send(emailData);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("[readCategory]", error);
    return res.status(500).json({
      errors: [{ msg: "Something went wrong, try again later." }],
    });
  }
};
