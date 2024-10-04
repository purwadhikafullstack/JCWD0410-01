import UpdateAddressPage from "@/features/address/UpdateAddress";

const UpdateAddress = ({ params }: { params: { id: string } }) => {
  return <UpdateAddressPage addressId={params.id} />;
};

export default UpdateAddress;
