import { transporter } from "./Email.config.js";
import { Verification_Email_Template, Welcome_Email_Template } from "./EmailTemplate.js";

export const SendVerficationCode = async (email, verficationCode) => {
    try {
        const response = await transporter.sendMail({
            from: '"This is meet from StarConnect 👻" <gangwalmeet4@gmail.com>', // sender address
            to: email,
            subject:"Verify your Email", // list of receivers
            text: "Verify ypur email", // plain text body
            html: Verification_Email_Template.replace("{verificationCode}",verficationCode),//it will replace this {verificationCode} by the verificationCode
        });
        console.log("Email Send Successfully",response)
    } catch(error){
        console.log("Email error",error)
    }
}

export const Welcome_Email = async (email, name) => {
    try {
        const response = await transporter.sendMail({
            from: '"This is meet from StarConnect 👻" <gangwalmeet4@gmail.com>', // sender address
            to: email,
            subject:"Verify your Email", // list of receivers
            text: "Verify ypur email", // plain text body
            html: Welcome_Email_Template.replace("{name}",name),//it will replace this {name} by the name
        });
        console.log("Email Send Successfully",response)
    } catch(error){
        console.log("Email error",error)
    }
}