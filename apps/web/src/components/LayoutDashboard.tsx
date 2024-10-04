import { PropsWithChildren } from "react";
import SidebarDashboard from "./SidebarDashboard";

const LayoutDashboard = async ({ children }: PropsWithChildren) => {

  return (
    <div>
      {/* <Sidebar /> */}
      <SidebarDashboard />
        <div className="md:w-[calc(100%-256px)] md:ml-64">
          {children}
        </div>
    </div>
  );
};

export default LayoutDashboard;
