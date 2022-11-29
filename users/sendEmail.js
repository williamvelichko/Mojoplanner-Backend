const nodemailer = require("nodemailer");
require("dotenv").config();

// async..await is not allowed in global scope, must use a wrapper
module.exports = async (email, subject, text) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.EMAIL_PORT,
      // service: Number(process.env.SERVICE),
      // secure: Boolean(process.env.SECURE),
      service: "Gmail",
      //secure: process.env.SECURE, // true for 465, false for other ports
      auth: {
        // user: process.env.USER, // generated ethereal user
        // pass: process.env.PASS, // generated ethereal password
        user: "williamvelichko2003@gmail.com", // generated ethereal user
        pass: "sgvlnkvyczxodwmz",
      },
    });

    // send mail with defined transport object
    await transporter.sendMail({
      from: process.env.USER, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      // html: "<b>Hello world?</b>", // html body
    });

    console.log("Email sent successfully");
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (error) {
    console.log("Email not sent");
    console.log(error);
  }
};
//main().catch(console.error);
