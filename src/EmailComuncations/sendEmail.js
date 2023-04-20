import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail({ to, html } = {}) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SENDEMAIL, // generated ethereal user
            pass: process.env.SENDEMAILPASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Sayed Mahmoud 👻" <${process.env.SENDEMAIL}>`, // sender address
        to,
        html,
    });

    console.log({ info });
    return info.rejected.length ? false : true

    // console.log(info?.rejected.length);



}

