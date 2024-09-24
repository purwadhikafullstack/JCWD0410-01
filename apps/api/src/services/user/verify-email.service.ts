import prisma from '@/prisma';
import Handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';
import { transporter } from '@/lib/nodemailer';

export const verifyEmailService = async (userId: number, email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email, isVerified: true },
    });

    if (user) {
      throw new Error('This email has already been verified.');
    }

    await prisma.user.update({
      where: { id: userId },
      data: { email: email, isVerified: true },
    });

    const emailTemplatePath = path.join(
      __dirname,
      '../../../templates/verify-email.hbs',
    );

    const emailTemplateSource = fs.readFileSync(emailTemplatePath, 'utf-8');

    const template = Handlebars.compile(emailTemplateSource);
    const htmlToSend = template({
      newEmail: email,
      year: new Date().getFullYear(),
    });

    await transporter.sendMail({
      to: email,
      subject: 'Verify Your Email - FreshNest Laundry',
      html: htmlToSend,
    });

    return {
      message: 'Change email success',
    };
  } catch (error) {
    throw error;
  }
};
