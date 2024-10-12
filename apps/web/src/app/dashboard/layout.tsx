import LayoutDashboard from "@/components/LayoutDashboard";
import { Poppins } from "next/font/google";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "800", "900"],
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <LayoutDashboard>{children}</LayoutDashboard>
    </section>
  );
}
