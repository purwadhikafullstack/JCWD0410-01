import { BASE_URL_FE, JWT_SECRET } from '@/config';
import { transporter } from '@/lib/nodemailer';
import prisma from '@/prisma';
import { sign } from 'jsonwebtoken';

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

    await transporter.sendMail({
      to: email,
      subject: 'Link Reset Password',
      html: `<a href="${link}" target="_blank">Reset Password Here </a>`,
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
