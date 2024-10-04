//TO BE DELETED


// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const DashboardPickupOrdersPage = () => {
//   const pathname = usePathname();
//   const unclicked = "rounded-2xl px-3 py-2 hover:bg-blue2 w-24 text-center";
//   const clicked = "rounded-2xl bg-blue2 px-3 py-2 w-24 text-center";

//   return (
//     <nav className="h-20 content-center bg-blue-200 p-3 shadow-md">
//       {/* <div className="text-sm text-gray-500 mb-2">{pathname}</div> */}
//       <div className="flex justify-between">
//         <div className="flex gap-2">
//           {pathname === "/dashboard/pickup-orders/ongoing" ? (
//             <Link href="/dashboard/pickup-orders/ongoing" className={clicked}>
//               Ongoing
//             </Link>
//           ) : (
//             <Link href="/dashboard/pickup-orders/ongoing" className={unclicked}>
//               Ongoing
//             </Link>
//           )}
//           {pathname === "/dashboard/pickup-orders/request" ? (
//             <Link href="/dashboard/pickup-orders/request" className={clicked}>
//               Request
//             </Link>
//           ) : (
//             <Link href="/dashboard/pickup-orders/request" className={unclicked}>
//               Request
//             </Link>
//           )}
//           {pathname === "/dashboard/pickup-orders/history" ? (
//             <Link href="/dashboard/pickup-orders/history" className={clicked}>
//               History
//             </Link>
//           ) : (
//             <Link href="/dashboard/pickup-orders/history" className={unclicked}>
//               History
//             </Link>
//           )}
//         </div>
//         <Link
//           href="/dashboard/create-event"
//           className="hover:bg-blue3 rounded-3xl bg-blue1 px-4 py-2 font-bold text-white transition-colors duration-200"
//         >
//           Create Event
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default DashboardPickupOrdersPage;
