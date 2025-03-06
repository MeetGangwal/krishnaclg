import { transporter } from "./Email.config.js";
export const StatusEmail = async (email,status) => {
    try {
        const response = await transporter.sendMail({
            from: '"This is {} from StarConnect 👻" <gangwalmeet4@gmail.com>',
      to: email,
      subject: `Application Status Update`,
      html: `
        <h2>Hello ,</h2>
        <p>Your application status has been updated to: <strong>${status}</strong></p>
        <p>Thank you for applying. We will keep you updated on further developments.</p>
        <br/>
        <p>Best Regards,</p>
        <p>StarConnect Team</p>
      `,
        });
        console.log("Email Send Successfully",response)
    } catch(error){
        console.log("Email error",error)
    }
}