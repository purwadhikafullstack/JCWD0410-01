// import { JWT_SECRET } from '@/config';
// import { comparePassword, hashPassword } from '@/lib/bcrypt';
// import prisma from '@/prisma';
// import { User } from '@prisma/client';
// import { sign } from 'jsonwebtoken';

// interface updateUserAdminInterface extends Partial<User> {
//   address?: string,
// }

// export const updateUserAdminService = async (
//   body: updateUserAdminInterface,
// ) => {
//   try {
//     const {email, name, phoneNumber, password, role} = body;
//     if (body.email) {
//       const existingEmail = await prisma.user.findFirst({
//         where: {
//           email: body.email,
//         },
//       });

//       if (existingEmail) {
//         throw new Error('Email already exist');
//       }
//     }

//     if (body.username) {
//       const existingUsername = await prisma.user.findFirst({
//         where: {
//           username: body.username,
//         },
//       });

//       if (existingUsername) {
//         throw new Error('Username already exist');
//       }
//     }

//     const oldAccount = await prisma.user.findFirst({
//       where: {
//         id: userId,
//       }
//     })

//     const hashedPassword = body.password ? await hashPassword(body.password) : oldAccount?.password;
//     body.password = hashedPassword;

//     const updatedUser = await prisma.user.update({
//       where: {id: userId},
//       data: {...body}
//     })

//     const token = sign({ role: updatedUser.role, id: updatedUser.id }, JWT_SECRET!, {
//       expiresIn: '2h',
//     });

//     const { password: pass, ...userWithoutPassword } = updatedUser;

//     return { ...userWithoutPassword, token };
//   } catch (error) {
//     throw error;
//   }
// };
