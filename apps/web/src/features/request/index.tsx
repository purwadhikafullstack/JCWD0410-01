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
import useCreateUserOrder from "@/hooks/api/order/useCreateUserOrder";
import { SpinnerCircularFixed } from "spinners-react";

const RequestOrderPage = () => {
  const { mutateAsync: createOrder, isPending } = useCreateUserOrder();
  const baseFee = 3000;
  const result = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
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
  const [selectedPickupDistance, setSelectedPickupDistance] =
    useState<number>(0);
  const [selectedDeliveryDistance, setSelectedDeliveryDistance] =
    useState<number>(0);
  const [distance, setDistance] = useState("0");

  const formik = useFormik({
    initialValues: {
      pickupLatitude: selectedPickupAddressCoord.lat,
      pickupLongitude: selectedPickupAddressCoord.lon,
      pickupFee: 0,
      pickupAddressId: selectedPickupAddressId,
      pickupAddress: selectedPickupAddress,
      deliveryLatitude: selectedDeliveryAddressCoord.lat,
      deliveryLongitude: selectedDeliveryAddressCoord.lon,
      deliveryFee: 0,
      deliveryAddressId: selectedDeliveryAddressId,
      outletId: selectedOutletId,
      outletName: selectedOutletName,
    },
    // validationSchema: CreateEventSchema,
    onSubmit: async (values) => {
      await createOrder({
        pickupLatitude: String(values.pickupLatitude),
        pickupLongitude: String(values.pickupLongitude),
        pickupFee: baseFee * Math.ceil(selectedPickupDistance),
        pickupAddressId: values.pickupAddressId,
        pickupAddress: values.pickupAddress,
        deliveryLatitude: String(values.deliveryLatitude),
        deliveryLongitude: String(values.deliveryLongitude),
        deliveryFee: baseFee * Math.ceil(selectedDeliveryDistance),
        deliveryAddressId: values.deliveryAddressId,
        outletId: values.outletId,
        outletName: values.outletName,
        pickupStatus: "WAITING_FOR_DRIVER",
        deliveryStatus: "PROCESSING_LAUNDRY",
      });
    },
  });

  const handleSelectPickupAddress = (value: string) => {
    setSelectedPickupAddressId(Number(value.split(" ")[0]));
    setSelectedPickupAddressCoord({
      lat: Number(value.split(" ")[1]),
      lon: Number(value.split(" ")[2]),
    });
    setSelectedPickupAddress(value.split(" ")[3]);
    formik.values.pickupAddressId = Number(value.split(" ")[0]);
    formik.values.pickupLatitude = Number(value.split(" ")[1]);
    formik.values.pickupLongitude = Number(value.split(" ")[2]);
    formik.values.pickupAddress = value.split(" ")[3];
  };

  const handleSelectDeliveryAddress = (value: string) => {
    setSelectedDeliveryAddressId(Number(value.split(" ")[0]));
    setSelectedDeliveryAddressCoord({
      lat: Number(value.split(" ")[1]),
      lon: Number(value.split(" ")[2]),
    });
    setSelectedDeliveryAddress(value.split(" ")[3]);
    formik.values.deliveryAddressId = Number(value.split(" ")[0]);
    formik.values.deliveryLatitude = Number(value.split(" ")[1]);
    formik.values.deliveryLongitude = Number(value.split(" ")[2]);
  };

  const handleSelectOutlet = (value: string) => {
    setSelectedOutletId(Number(value.split(" ")[0]));
    setSelectedOutletCoord({
      lat: Number(value.split(" ")[1]),
      lon: Number(value.split(" ")[2]),
    });
    setSelectedOutletName(value.split(" ")[3]);
    formik.values.outletId = Number(value.split(" ")[0]);
    formik.values.outletName = value.split(" ")[3];
  };

  const { data: addresses } = useGetAddresses();

  const { data: outlets } = useGetOutlets({ take: 10 });

  useEffect(() => {
    setDistance(
      (
        (haversine(selectedPickupAddressCoord, selectedOutletCoord) +
          haversine(selectedDeliveryAddressCoord, selectedOutletCoord)) /
        1000
      ).toFixed(2),
    );
  }, [selectedOutletCoord]);

  useEffect(() => {
    setSelectedPickupDistance(
      haversine(selectedPickupAddressCoord, selectedOutletCoord) / 1000,
    );
  }, [selectedPickupAddressCoord, selectedOutletCoord]);

  useEffect(() => {
    setSelectedDeliveryDistance(
      haversine(selectedDeliveryAddressCoord, selectedOutletCoord) / 1000,
    );
  }, [selectedDeliveryAddressCoord, selectedOutletCoord]);

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
              <form
                className="space-y-6 rounded-md border-[1px] p-6 md:col-span-2"
                onSubmit={formik.handleSubmit}
              >
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
                      (!selectedPickupAddressCoord.lat &&
                        !selectedPickupAddressCoord.lon) ||
                      (!selectedDeliveryAddressCoord.lat &&
                        !selectedDeliveryAddressCoord.lon)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih lokasi outlet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {outlets?.data
                          .sort(
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
                                {/* <span className="ml-2 rounded-xl bg-blue-500 p-1 text-center text-xs">
                                  Total:{" "}
                                  {Number(pickupDistance) +
                                    Number(deliveryDistance)}{" "}
                                  km
                                </span> */}
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

                <Button
                  className="bg-[#36bbe3]"
                  type="submit"
                  disabled={isPending || (selectedPickupDistance > 10) || (selectedDeliveryDistance > 10) || (selectedDeliveryDistance === 0)}
                >
                  {isPending ? (
                    <div className="flex items-center gap-1">
                      <SpinnerCircularFixed size={20} />
                      <p className="text-sm">Loading</p>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
              <div className="h-fit justify-between space-y-4 rounded-md border-[1px] p-6">
                <div className="flex justify-between text-sm">
                  <p>Jarak Total (Rounded)</p>
                  <p>{Math.ceil(selectedPickupDistance) + Math.ceil(selectedDeliveryDistance)} km</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p>Biaya/km</p>
                  <p>{result.format(baseFee)}</p>
                </div>
                <hr className="border-dashed" />
                <div className="flex justify-between font-semibold">
                  <p>Total Biaya Transport</p>
                  <p>{result.format((Math.ceil(selectedPickupDistance) + Math.ceil(selectedDeliveryDistance)) * baseFee)}</p>
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
