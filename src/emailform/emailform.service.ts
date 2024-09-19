import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailFormDto } from './dto/email-form.dto';

@Injectable()
export class EmailFormService {
  async sendEmail(emailFormDto: EmailFormDto): Promise<{ message: string }> {
    const { name, email, mobileNumber, message, category, subject } = emailFormDto;

    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or any other email service
      auth: {
        user: 'sales@dprprop.com', 
        pass: 'ufqy vlph geix jfgr', 
      },
    });

    const mailOptions = {
      from: email,
      to: 'srinivasnani005@gmail.com',
      subject: subject ? subject : 'No subject provided',
      text: `
        Name: ${name}
        Email: ${email}
        Mobile Number: ${mobileNumber}
        ${category ? `Category: ${category}` : ''}
        ${message ? `Message: ${message}` : ''}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return { message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}