import nodemailer from 'nodemailer'

const defineEventHandler = (async (even: string, link:string) => {
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })

        const mailOptions = {
            from: process.env.SMTP_USER,
            even,
            subject: "email confirmation",
            text: "",
            html: `
                <div><a href="${link}"> ${link}</a></div>
            `};
        
        const send = () => {
            return new Promise((resolve,reject) => {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(info)
                })
            })
        }

        await send()

        return {
            message: "message sent"
        }
    }catch(err){
        throw err
    }
}); 

export default defineEventHandler;