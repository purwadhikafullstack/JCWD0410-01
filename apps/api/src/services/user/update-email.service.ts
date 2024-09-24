import prisma from '@/prisma';
import { BASE_URL_FE, JWT_SECRET } from '@/config';
import Handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';
import { transporter } from '@/lib/nodemailer';
import { sign } from 'jsonwebtoken';

export const updateEmailService = async (userId: number, email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (user) {
      throw new Error('Email already has been used');
    }

    const token = sign({ id: userId, email }, JWT_SECRET!, {
      expiresIn: '60m',
    });

    const link = BASE_URL_FE + `/verify-email/${token}?email=${email}`;

    const emailTemplatePath = path.join(
      __dirname,
      '../../../templates/verify-email.hbs',
    );

    const emailTemplateSource = fs.readFileSync(emailTemplatePath, 'utf-8');

    const template = Handlebars.compile(emailTemplateSource);
    const htmlToSend = template({
      newEmail: email,
      link,
      year: new Date().getFullYear(),
    });

    await transporter.sendMail({
      to: email,
      subject: 'Verify Your New Email - FreshNest Laundry',
      html: htmlToSend,
    });

    return {
      message: 'Change email success',
    };
  } catch (error) {
    throw error;
  }
};
