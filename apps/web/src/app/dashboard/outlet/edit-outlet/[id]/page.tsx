import EditOutletPage from "@/features/dashboard/outlet/EditOutlet";
import React from "react";

const EditOutlet = ({ params }: { params: { id: string } }) => {
  return <EditOutletPage outletId={params.id} />;
};

export default EditOutlet;
