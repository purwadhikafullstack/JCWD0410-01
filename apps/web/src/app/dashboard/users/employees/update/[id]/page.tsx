import UpdateEmployeePage from "@/features/dashboard/users/employees/UpdateEmployee";
import React from "react";

const UpdateEmployee = ({ params }: { params: { id: number } }) => {
  return <UpdateEmployeePage userId={params.id} />;
};

export default UpdateEmployee;
