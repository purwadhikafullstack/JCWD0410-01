"use client";

import AlertDialogDemo from "@/components/AlertDialog";
import { Button } from "@/components/ui/button";
import useDeleteAddress from "@/hooks/api/address/useDeleteAddress";
import useGetAddresses from "@/hooks/api/address/useGetAddresses";
import useSetPrimaryAddress from "@/hooks/api/address/useSetPrimaryAddress";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

const AddressPage = () => {
  const { data, refetch } = useGetAddresses();
  const { mutateAsync: deleteAddress, isPending } = useDeleteAddress();
  const { mutateAsync: setPrimaryAddress, isPending: isLoading } =
    useSetPrimaryAddress();

  const handleDeleteAddress = async (addressId: string) => {
    await deleteAddress(addressId);
    refetch();
  };

  const handleSetPrimary = async (addressId: string) => {
    await setPrimaryAddress(addressId);
    refetch();
  };

  return (
    <div className="mx-auto min-h-screen max-w-7xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Alamat Saya</p>
        <Link href="/address/add-address">
          <Button className="flex items-center gap-1">
            <FaPlus /> <p>Tambah Alamat Baru</p>
          </Button>
        </Link>
      </div>
      {data?.length === 0 ? (
        "Belum Ada Alamat"
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
                    {address.isPrimary ? <p>| Utama</p> : ""}
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-2 p-4 md:flex-row">
                  <div className="space-y-1">
                    <p>{address.address}</p>
                    <p>{`${address.district.toUpperCase()}, ${address.city.toUpperCase()}, DI YOGYAKARTA, 13720`}</p>
                  </div>
                  <div className="flex flex-row justify-between gap-2 md:flex-col md:justify-normal">
                    <div className="flex justify-end gap-4 text-[#37bae3]">
                      <Link
                        href={`/address/update-address/${address.id}`}
                        className="text-sm text-[#37bae3]"
                      >
                        Ubah
                      </Link>
                      <AlertDialogDemo
                        classname="text-[#37bae3] text-sm"
                        action="Hapus"
                        title="Apakah Anda yakin?"
                        description="Tindakan ini tidak dapat dibatalkan. Ini akan menghapus alamat secara permanen dari akun Anda dan menghilangkan data terkait dari server kami."
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
                      Atur sebagai utama
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
