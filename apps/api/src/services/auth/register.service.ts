import { BASE_URL_FE, JWT_SECRET } from '@/config';
import { hashPassword } from '@/lib/bcrypt';
import { transporter } from '@/lib/nodemailer';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import Handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';
import { sign } from 'jsonwebtoken';

export const registerService = async (body: User) => {
  try {
    const { email } = body;

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser && existingUser.isVerified === true) {
      throw new Error('User already exist');
    }

    const newUser = existingUser
      ? null
      : await prisma.user.create({
          data: {
            email,
          },
        });

    const token = sign({ email }, JWT_SECRET!, {
      expiresIn: '60m',
    });

    if (existingUser) {
      await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          token,
        },
      });
    } else if (newUser) {
      await prisma.user.update({
        where: { id: newUser.id },
        data: {
          token,
        },
      });
    }

    // const link = BASE_URL_FE + `/register/complete-registration/${token}/?email=hbhbhb`;
    const link = BASE_URL_FE + `/register/complete-registration/${token}`;

    const emailTemplatePath = path.join(
      __dirname,
      '../../../templates/complete-register.hbs',
    );

    const emailTemplateSource = fs.readFileSync(emailTemplatePath, 'utf-8');

    const template = Handlebars.compile(emailTemplateSource);
    const htmlToSend = template({
      link: link,
      year: new Date().getFullYear(),
    });

    await transporter.sendMail({
      to: email,
      subject: 'Verify Your Email - FreshNest Laundry',
      html: htmlToSend,
    });

    return {
      newUser,
      message: 'Register Success',
    };
  } catch (error) {
    throw error;
  }
};
