import LayoutDashboard from "@/components/LayoutDashboard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <section>
        <LayoutDashboard>
          {children}
        </LayoutDashboard>
      </section>
  );
}
