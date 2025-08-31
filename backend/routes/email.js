const express= require("express")
const router = express.Router();
const dotenv= require('dotenv').config()
const nodemailer = require ("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail", 
  auth: {
    user: process.env.MAIL_RECEIVER,
    pass: process.env.APP_PASSWORD, 
  },
});

router.post("/mail",async(req,res)=>{
    try{
        const sender= req.body.email
        const receiver= process.env.MAIL_RECEIVER
        const name= req.body.name
        const message= req.body.message

         const mailOptions = {
      from: `"${name}" <${sender}>`,   // sender info
      to: receiver,     //  email where I to receive
      subject: `New Portify from ${name}`,
      text: `Name: ${name}\nEmail: ${sender}\nMessage:\n${message}`,
      html: ` <div style="font-family: Arial, sans-serif; background-color: #1a1a1a; color: #f1f1f1; padding: 20px; border-radius: 10px;">
    <h2 style="color: #9b59b6; margin-bottom: 10px;">New Contact Form Message</h2>
    <hr style="border: 1px solid #9b59b6; margin-bottom: 20px;" />
    <p><strong style="color: #9b59b6;">Name:</strong> ${name}</p>
    <p><strong style="color: #9b59b6;">Email:</strong> ${sender}</p>
    <p><strong style="color: #9b59b6;">Message:</strong></p>
    <div style="background-color: #2c2c2c; padding: 15px; border-radius: 8px; margin-top: 5px;">
      <p style="margin: 0; line-height: 1.5;">${message.replace(/\n/g, "<br>")}</p>
    </div>
    <hr style="border: 1px solid #9b59b6; margin-top: 20px;" />
    <p style="font-size: 12px; color: #888;">This message was sent via your Portify Contact Form.</p>
  </div>`
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ error:false, message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error:true, message: "Failed to send message." });
  }

})






module.exports=router