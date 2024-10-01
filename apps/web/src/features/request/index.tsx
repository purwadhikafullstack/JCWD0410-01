"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetAddresses from "@/hooks/api/address/useGetAddresses";
import useGetOutlets from "@/hooks/api/outlet/useGetOutlets";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";

const RequestOrderPage = () => {
  const [selectedAddressId, setSelectedAddressId] = useState<number>(0);

  const formik = useFormik({
    initialValues: {
      fee: 0,
    },
    // validationSchema: CreateEventSchema,
    onSubmit: async (values) => {
      // await createEvent({
      //   ...values,
      //   categoryId: selectedCategoryId,
      // });
    },
  });

  const handleSelectAddress = (value: string) => {
    setSelectedAddressId(Number(value));
  };

  const { data: addresses } = useGetAddresses();
  const { data: outlets } = useGetOutlets();

  return (
    <div className="mx-auto my-10 max-w-7xl p-6">
      <div className="flex flex-col justify-center">
        <h2 className="mb-1 text-3xl font-semibold">Buat Pesanan</h2>
        <p className="mb-8 text-neutral-600">
          Pesan penjemputan laundry dengan mudah. Pilih lokasi dan outlet
          terdekat, kami akan menjemput pakaian Anda tepat waktu.
        </p>
        {addresses?.length === 0 ? (
          <div className="flex min-h-[350px] flex-col justify-center gap-8 rounded-md border-[1px] text-center md:min-h-[500px]">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                Belum ada alamat yang terdaftar
              </h2>
              <p className="text-neutral-600">
                Tambahkan alamat Anda untuk mulai membuat pesanan.
              </p>
            </div>
            <Link href="/address/add-address">
              <Button>Tambah Alamat</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <form className="space-y-6 rounded-md border-[1px] p-6 md:col-span-2">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Alamat</Label>
                <Select onValueChange={handleSelectAddress}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih lokasi anda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {addresses?.map((address, index: number) => {
                        return (
                          <SelectItem key={index} value={String(address.id)}>
                            {address.address}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Outlet</Label>
                <Select onValueChange={handleSelectAddress}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih lokasi outlet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {outlets?.map((outlet, index: number) => {
                        return (
                          <SelectItem key={index} value={String(outlet.id)}>
                            {outlet.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <Button className="bg-[#36bbe3]" type="submit">
                Submit
              </Button>
            </form>
            <div className="h-fit justify-between space-y-4 rounded-md border-[1px] p-6">
              <div className="flex justify-between text-sm">
                <p>Jarak</p>
                <p>3 km</p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Biaya/km</p>
                <p>Rp 5.000</p>
              </div>
              <hr className="border-dashed" />
              <div className="flex justify-between font-semibold">
                <p>Total Biaya</p>
                <p>Rp 15.000</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestOrderPage;
