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
import { useEffect, useState } from "react";
import haversine from "haversine-distance";

const RequestOrderPage = () => {
  const [selectedPickupAddress, setSelectedPickupAddress] =
    useState<string>("");
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] =
    useState<string>("");
  const [selectedPickupAddressId, setSelectedPickupAddressId] =
    useState<number>(0);
  const [selectedDeliveryAddressId, setSelectedDeliveryAddressId] =
    useState<number>(0);
  const [selectedPickupAddressCoord, setSelectedPickupAddressCoord] = useState({
    lat: 0,
    lon: 0,
  });
  const [selectedDeliveryAddressCoord, setSelectedDeliveryAddressCoord] =
    useState({
      lat: 0,
      lon: 0,
    });
  const [selectedOutletCoord, setSelectedOutletCoord] = useState({
    lat: 0,
    lon: 0,
  });
  const [selectedOutletName, setSelectedOutletName] = useState<string>("");
  const [selectedOutletId, setSelectedOutletId] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);

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

  const handleSelectPickupAddress = (value: string) => {
    setSelectedPickupAddressId(Number(value.split(" ")[0]));
    setSelectedPickupAddressCoord({
      lat: Number(value.split(" ")[1]),
      lon: Number(value.split(" ")[2]),
    });
    setSelectedPickupAddress(value.split(" ")[3]);
  };

  const handleSelectDeliveryAddress = (value: string) => {
    setSelectedDeliveryAddressId(Number(value.split(" ")[0]));
    setSelectedDeliveryAddressCoord({
      lat: Number(value.split(" ")[1]),
      lon: Number(value.split(" ")[2]),
    });
    setSelectedDeliveryAddress(value.split(" ")[3]);
  };

  const handleSelectOutlet = (value: string) => {
    setSelectedOutletId(Number(value.split(" ")[0]));
    setSelectedOutletCoord({
      lat: Number(value.split(" ")[1]),
      lon: Number(value.split(" ")[2]),
    });
    setSelectedOutletName(value.split(" ")[3]);
  };

  const { data: addresses } = useGetAddresses();

  const { data: outlets } = useGetOutlets({ take: 5 });

  useEffect(() => {
    setDistance(haversine(selectedPickupAddressCoord, selectedOutletCoord));
  }, [selectedPickupAddressCoord, selectedOutletCoord]);

  return (
    <div className="mx-auto my-10 max-w-7xl p-6">
      <div className="flex flex-col justify-center">
        <h2 className="mb-1 text-3xl font-semibold">Buat Pesanan</h2>
        <p className="mb-8 text-neutral-600">
          Pesan penjemputan laundry dengan mudah. Pilih lokasi dan outlet
          terdekat, kami akan menjemput pakaian Anda tepat waktu.
        </p>
        {!addresses?.length ? (
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
          <>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              <form className="space-y-6 rounded-md border-[1px] p-6 md:col-span-2">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Alamat Pickup</Label>
                  <Select onValueChange={handleSelectPickupAddress}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih lokasi pickup" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {addresses?.map((address, index: number) => {
                          const value = `${String(address.id)} ${address.latitude} ${address.longitude} ${address.address}`;
                          return (
                            <SelectItem key={index} value={value}>
                              {address.address}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">
                    Alamat Delivery
                  </Label>
                  <Select onValueChange={handleSelectDeliveryAddress}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih lokasi delivery" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {addresses?.map((address, index: number) => {
                          const value = `${String(address.id)} ${address.latitude} ${address.longitude} ${address.address}`;
                          return (
                            <SelectItem key={index} value={value}>
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
                  <Select
                    onValueChange={handleSelectOutlet}
                    disabled={
                      !selectedPickupAddressCoord.lat &&
                      !selectedPickupAddressCoord.lon
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih lokasi outlet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {outlets
                          ?.data.sort(
                            (a, b) =>
                              haversine(selectedPickupAddressCoord, {
                                lat: Number(a.latitude),
                                lon: Number(a.longitude),
                              }) +
                              haversine(selectedDeliveryAddressCoord, {
                                lat: Number(a.latitude),
                                lon: Number(a.longitude),
                              }) -
                              (haversine(selectedPickupAddressCoord, {
                                lat: Number(b.latitude),
                                lon: Number(b.longitude),
                              }) +
                                haversine(selectedDeliveryAddressCoord, {
                                  lat: Number(b.latitude),
                                  lon: Number(b.longitude),
                                })),
                          )
                          .map((outlet, index: number) => {
                            const value = `${String(outlet.id)} ${outlet.latitude} ${outlet.longitude} ${outlet.name}`;
                            const pickupDistance = (
                              haversine(selectedPickupAddressCoord, {
                                lat: Number(outlet.latitude),
                                lon: Number(outlet.longitude),
                              }) / 1000
                            ).toFixed(2);
                            const deliveryDistance = (
                              haversine(selectedDeliveryAddressCoord, {
                                lat: Number(outlet.latitude),
                                lon: Number(outlet.longitude),
                              }) / 1000
                            ).toFixed(2);
                            const distanceLimit =
                              Number(pickupDistance) > 10 ||
                              Number(deliveryDistance) > 10
                                ? true
                                : false;
                            return (
                              <SelectItem
                                key={index}
                                value={value}
                                disabled={distanceLimit}
                              >
                                {outlet.name}
                                <span className="ml-2 rounded-xl bg-blue-500 p-1 text-center text-xs">
                                  Pickup: {pickupDistance} km
                                </span>
                                <span className="ml-2 rounded-xl bg-blue-500 p-1 text-center text-xs">
                                  Delivery: {deliveryDistance} km
                                </span>
                                <span className="ml-2 rounded-xl bg-blue-500 p-1 text-center text-xs">
                                  Total:{" "}
                                  {Number(pickupDistance) +
                                    Number(deliveryDistance)}{" "}
                                  km
                                </span>
                                {distanceLimit ? (
                                  <span className="ml-2 text-red-600">
                                    Maximum distance is 10km
                                  </span>
                                ) : null}
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
          </>
        )}
      </div>
    </div>
  );
};

export default RequestOrderPage;
