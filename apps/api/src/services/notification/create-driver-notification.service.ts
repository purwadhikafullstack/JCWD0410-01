// import { Prisma } from '@prisma/client';

// interface DriverNotificationInterface {
//   type: 'PICKUP' | 'DELIVERY';
//   origin: string,
//   destination: string,
// }

// export const createDriverNotificationService = async (body: DriverNotificationInterface, tx: Prisma.TransactionClient) => {
//   try {
//     const {type, origin, destination} = body;

//     if (!type) {
//       throw new Error('Wajib ada type, ini placeholder, pindah ke validator');
//     }

//     if (!origin) {
//       throw new Error('Wajib ada origin, ini placeholder, pindah ke validator');
//     }

//     if (!destination) {
//       throw new Error('Wajib ada destination, ini placeholder, pindah ke validator');
//     }

//     return await tx.$transaction(async (prisma) => {
//       const notif = await tx.notification.create({
//         data: {
//           title: `New ${type} request`,
//           message: `Requesting ${type} from ${origin} to ${destination}`,
//         },
//       });

//       const drivers = await tx.user.findMany({
//         where: {
//           role: 'DRIVER',
//         },
//         select: {
//           id: true,
//         }
//       })

//       const data = drivers.map((driver) => {
//         return {userId: driver.id, notificationId: notif.id}
//       })

//       await tx.user_Notification.createMany({
//         data,
//       })
//       return {
//         message: 'Notification created',
//       };
//     });
//   } catch (error) {
//     throw error;
//   }
// };
