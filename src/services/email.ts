import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  service: "gmail",

  auth: {
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_AUTH_PASS,
  },
  debug: true,
  logger: true,
});
export const registerMail:any = async (email:string, token:string, host:string) => {
  try {
    let mailoption = {
      from: "alishkarki220@gmail.com",
      to: email,
      subject: "User Verification",
      html: `<h1> click the link to verify your account  </h1>
            <a href="http://${host}/verify/${token}">Click the link to verify your account </a>`,
    };
    await transporter
      .sendMail(mailoption)
      .then((mail: any) => {
        return mail;
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    return err;
  }
};
