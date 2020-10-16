import { Request, Response } from "express"; 
import * as nodemailer  from "nodemailer"
// const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars'); 

export class EmailService{ 
 async sendWelcomeMail(req: Request, res: Response){  
     try{ 
        let reciepient_email = req.headers.email_id;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ID, 
            pass: process.env.EMAIL_PASSWORD
        }
    });  

    const handlebarOptions = {
        viewEngine: {
            extName: '.handlebars',
            partialsDir: "./views/layout",
            layoutsDir:  "./views/partials",
        },
        viewPath: './views/',
        extName: '.handlebars',
        };
        
    transporter.use('compile', hbs(handlebarOptions));   

    
    let mailOptions = {
        from: 'densonabraham98@gmail.com', 
        to: reciepient_email, 
        subject: 'Welcome Mail from Node Mailer',
        text: 'Testing Template',
        template: 'welcome',
        context: {
            name: 'Sarvesh Agrawal'
        } 
    }; 
    
    transporter.sendMail(mailOptions, (err: any, data: any) => {  
        console.log("in sendmail")
        console.log(data)
        if (err) { 
            console.log(err);
            return (err);
        } 
        console.log("email sent successfully")
        res.status(200).json(
            data
        );
    });
} 
    catch(err){ 
        res.status(500).json({
            message: err
        })
    }   
} 
}
     
    
    







