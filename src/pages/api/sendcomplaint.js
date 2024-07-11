// pages/api/sendComplaint.js

import nodemailer from 'nodemailer';
import mjml2html from 'mjml';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { generateMjmlTemplate } from '../../../email-template/email';



// async function compileEmailTemplate({ fileName, data }) {
//     const filePath = path.join(process.cwd(), 'email-template', fileName);
//     const mjmlContent = await fs.promises.readFile(filePath, 'utf8');
//     const htmlOutput = mjml2html(mjmlContent);
//     const template = handlebars.compile(htmlOutput.html);
//     return template(data);
//   }

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});


export default async function handler(req, res) {
  if (req.method === 'POST') {

    const { complaint, anonymous, username } = req.body;

    // const emailHtml = await compileEmailTemplate({
    //     fileName: 'mail.mjml',
    //     data: { username, anonymous, complaint }
    //   });
  
      let subject = anonymous ? 'New Anonymous Complaint' : `New Complaint Submission from ${username}`;

      const mjmlTemplate = generateMjmlTemplate(username, complaint, anonymous);
      const { html } = mjml2html(mjmlTemplate, { minify: true });


    try {
      await transporter.sendMail({
        from: process.env.MAIL_USERNAME,
        to: 'hamzanadeem170398@gmail.com',
        subject: subject,
        // text: anonymous
        //   ? `Anonymous complaint:\n\n${complaint}`
        //   : `Complaint from ${username}:\n\n${complaint}`,
        html:html
      });

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
