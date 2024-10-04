import useAxios from "@/hooks/useAxios";
import { Employee } from "@/types/employee";
import { Employee_Station } from "@/types/employee-station";
import { Outlet } from "@/types/outlet";
import { IPageableResponse, IPaginationQueries } from "@/types/pagination";
import { Station } from "@/types/station";
import { Role, User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export interface GetUsersQuery extends IPaginationQueries {
  search?: string;
  isVerified?: string;
  role?: Role;
  outletId?: number
}

export interface EmployeeStationExtension extends Employee_Station {
  station: Station;
}

export interface EmployeeExtension extends Employee {
  employeeStations: EmployeeStationExtension[];
  // deliveryOrders: Delivery_Order[];
  // pickupOrders: Pickup_Order[];
  outlet: Outlet;
  // workOrders: WorkOrders[];
}

export interface UserWithEmployee extends User {
  employee: EmployeeExtension;
}

const useGetEmployees = (queries: GetUsersQuery) => {
  const { axiosInstance } = useAxios();
  const pathname = usePathname();

  return useQuery({
    queryKey: ["users", queries, pathname],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        IPageableResponse<UserWithEmployee>
      >("/admin/employees", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetEmployees;
