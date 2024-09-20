import { BASE_URL_FE, JWT_SECRET } from '@/config';
import { hashPassword } from '@/lib/bcrypt';
import { transporter } from '@/lib/nodemailer';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

export const registerService = async (body: User) => {
  try {
    const { email } = body;

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser && existingUser.isVerified === true) {
      throw new Error('Email already exist');
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
    const link =
      BASE_URL_FE + `/register/complete-registration/${token}/?email=hbhbhb`;

    await transporter.sendMail({
      to: email,
      subject: 'Verify Your Email to Complete Registration',
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td>
              <table width="600" align="center" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
                <tr>
                  <td style="text-align: center;">
                    <h1 style="color: #36bbe3; margin-bottom: 20px;">Welcome to Our Service!</h1>
                    <p style="font-size: 16px; margin-bottom: 20px;">Hi,</p>
                    <p style="font-size: 16px; margin-bottom: 30px;">
                      Thank you for signing up with us. Please click the button below to verify your email and complete your registration.
                    </p>
                    <a href="${link}" target="_blank" 
                       style="background-color: #36bbe3; color: #ffffff; padding: 12px 25px; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 5px;">
                      Verify Email
                    </a>
                    <p style="font-size: 16px; margin-top: 40px;">
                      If the button doesn’t work, copy and paste the following link in your browser:
                    </p>
                    <p style="font-size: 14px; color: #777;">${link}</p>
                    <p style="font-size: 14px; color: #777; margin-top: 40px;">
                      If you did not create this account, please ignore this email.
                    </p>
                  </td>
                </tr>
              </table>
              <p style="font-size: 12px; color: #999; text-align: center; margin-top: 20px;">
                © 2024 Your Company Name. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </div>
      `,
    });

    return {
      newUser,
      message: 'Register Success',
    };
  } catch (error) {
    throw error;
  }
};
