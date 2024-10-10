// import prisma from '@/prisma';
// import { PaginationQueryParams } from '@/types/pagination';
// import { Prisma } from '@prisma/client';

// interface GetPropertiesByQuery extends PaginationQueryParams {
//   search?: string;
//   startDate?: Date;
//   endDate?: Date;
//   guest?: number;
//   title?: string;
//   category?: string;
// }

// export const getPropertiesServiceByQuery = async (
//   query: GetPropertiesByQuery,
// ) => {
//   try {
//     const {
//       take,
//       page,
//       sortBy,
//       sortOrder,
//       search,
//       guest,
//       title,
//       category,
//       startDate,
//       endDate,
//     } = query;

//     // Parse startDate and endDate safely
//     const parsedStartDate = startDate ? new Date(startDate) : null;
//     const parsedEndDate = endDate ? new Date(endDate) : null;

//     // Ensure parsed dates are valid
//     const isValidDate = (date: Date | null) =>
//       date instanceof Date && !isNaN(date.getTime());

//     const validStartDate = isValidDate(parsedStartDate)
//       ? parsedStartDate
//       : null;
//     const validEndDate = isValidDate(parsedEndDate) ? parsedEndDate : null;

//     const whereClause: Prisma.PropertyWhereInput = {
//       isDeleted: false, // Always exclude deleted properties
//       // AND: [
//       //   ...(category
//       //     ? [{ propertycategory: { name: { contains: category } } }]
//       //     : []),
//       //   ...(guest ? [{ rooms: { some: { stock: { gte: guest } } } }] : []),
//       //   ...(validStartDate && validEndDate
//       //     ? [
//       //         {
//       //           rooms: {
//       //             some: {
//       //               roomNonAvailabilities: {
//       //                 none: {
//       //                   OR: [
//       //                     {
//       //                       startDate: { lte: validEndDate },
//       //                       endDate: { gte: validStartDate },
//       //                     },
//       //                   ],
//       //                 },
//       //               },
//       //               stock: { gte: 1 },
//       //             },
//       //           },
//       //         },
//       //       ]
//       //     : []),
//       // ],
//     };

//     if (title) {
//       whereClause.title = { contains: title };
//     }

//     const propertiesByQuery = await prisma.property.findMany({
//       where: whereClause,
//       skip: (page - 1) * take,
//       take: take,
//       orderBy: sortBy ? { [sortBy]: sortOrder || 'asc' } : {},
//       include: {
//         propertyImages: { select: { imageUrl: true } },
//         reviews: { select: { rating: true } },
//         tenant: { select: { name: true } },
//         rooms: {
//           select: {
//             price: true,
//             stock: true,
//             roomNonAvailabilities: {
//               select: {
//                 startDate: true,
//                 endDate: true,
//               },
//             },
//           },
//         },
//         propertycategory: true,
//         propertyFacilities: true,
//       },
//     });

//     // Extract the lowest price for available rooms
//     const propertiesWithLowestPrice = propertiesByQuery.map((property) => {
//       const availableRooms = property.rooms.filter((room) => room.stock > 0);
//       const lowestPrice =
//         availableRooms.length > 0
//           ? Math.min(...availableRooms.map((room) => room.price))
//           : null;

//       return {
//         ...property,
//         lowestPrice,
//       };
//     });

//     const count = await prisma.property.count({ where: whereClause });
//     return {
//       data: propertiesWithLowestPrice,
//       meta: { page, take, total: count },
//       whereClause,
//     };
//   } catch (error) {
//     throw error;
//   }
// };