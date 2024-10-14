"use client";

import AlertDialogDemo from "@/components/AlertDialog";
import { Button } from "@/components/ui/button";
import useDeleteAddress from "@/hooks/api/address/useDeleteAddress";
import useGetAddresses from "@/hooks/api/address/useGetAddresses";
import useSetPrimaryAddress from "@/hooks/api/address/useSetPrimaryAddress";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

const AddressPage = () => {
  const session = useSession();
  const { data, refetch } = useGetAddresses();
  const { mutateAsync: deleteAddress, isPending } = useDeleteAddress();
  const { mutateAsync: setPrimaryAddress, isPending: isLoading } =
    useSetPrimaryAddress();

  const handleDeleteAddress = async (addressId: number) => {
    await deleteAddress(addressId);
    refetch();
  };

  const handleSetPrimary = async (addressId: number) => {
    await setPrimaryAddress(addressId);
    refetch();
  };

  if (!session.data) {
    return "<DashboardHeader />";
  }

  return (
    <div className="mx-auto min-h-screen max-w-7xl space-y-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">My Address</p>
        <Link href="/address/add-address">
          <Button className="flex items-center gap-1">
            <FaPlus />{" "}
            <p>
              Add <span className="hidden md:inline-block">Address</span>
            </p>
          </Button>
        </Link>
      </div>
      {!data?.length ? (
        <div className="flex min-h-[350px] flex-col justify-center gap-8 rounded-md border-[1px] text-center md:min-h-[500px]">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">
              No addresses registered yet.
            </h2>
            <p className="text-neutral-600">
              Add your address to start placing orders.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6 text-sm">
          {data?.map((address, index: number) => {
            return (
              <div
                className="flex flex-col rounded-md border-[1px]"
                key={index}
              >
                <div className="flex items-center justify-between border-b-[1px] bg-[#e5f3f6] p-3">
                  <div className="flex items-center gap-1">
                    <p className="font-semibold">{address.name}</p>
                    {address.isPrimary ? <p>| Primary</p> : ""}
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-2 p-4 md:flex-row">
                  <div className="space-y-1 md:w-[60%]">
                    <p>{address.address}</p>
                    <p>{`${address.district.toUpperCase()}, ${address.city.toUpperCase()}`}</p>
                  </div>
                  <div className="flex flex-row justify-between gap-2 md:w-fit md:flex-col md:justify-normal">
                    <div className="flex items-center justify-end gap-4 text-[#37bae3]">
                      <Link
                        href={`/address/update-address/${address.id}`}
                        className="text-sm text-[#37bae3]"
                      >
                        Edit
                      </Link>
                      <AlertDialogDemo
                        classname="text-[#37bae3] text-sm"
                        action="Delete"
                        title="Are you sure?"
                        description="This action cannot be undone. It will permanently delete the address from your account and remove related data from our servers"
                        onclick={() => handleDeleteAddress(address.id)}
                        disabled={isPending}
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="font-normal"
                      disabled={address.isPrimary ? true : false}
                      onClick={() => handleSetPrimary(address.id)}
                    >
                      Set as primary
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AddressPage;
