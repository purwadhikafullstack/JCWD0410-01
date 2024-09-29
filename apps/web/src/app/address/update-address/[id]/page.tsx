import UpdateAddressPage from "@/features/address/UpdateAddress";
import React from "react";

const UpdateAddress = ({ params }: { params: { id: string } }) => {
  return <UpdateAddressPage addressId={params.id} />;
};

export default UpdateAddress;
