import { BASE_URL_FE, JWT_SECRET } from '@/config';
import { transporter } from '@/lib/nodemailer';
import prisma from '@/prisma';
import { sign } from 'jsonwebtoken';
import Handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';

export const forgotPasswordService = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email, provider: 'CREDENTIALS' },
    });

    if (!user) {
      throw new Error('Invalid email address');
    }

    const token = sign({ id: user.id }, JWT_SECRET!, {
      expiresIn: '30m',
    });

    const link = BASE_URL_FE + `/reset-password/${token}`;

    const emailTemplatePath = path.join(
      __dirname,
      '../../../templates/forgot-password.hbs',
    );

    const emailTemplateSource = fs.readFileSync(emailTemplatePath, 'utf-8');

    const template = Handlebars.compile(emailTemplateSource);
    const htmlToSend = template({
      name: user.name,
      link: link,
      year: new Date().getFullYear(),
    });

    await transporter.sendMail({
      to: email,
      subject: 'Reset Password Request - FreshNest Laundry',
      html: htmlToSend,
    });

    await prisma.user.update({
      where: { email },
      data: {
        isPasswordReset: false,
      },
    });

    return {
      message: 'Send email success',
    };
  } catch (error) {
    throw error;
  }
};
