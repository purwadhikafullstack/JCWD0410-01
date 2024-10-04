"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetAddress from "@/hooks/api/address/useGetAddress";
import useUpdateAddress from "@/hooks/api/address/useUpdateAddress";
import axios from "axios";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import { FC, useEffect, useState } from "react";

const DynamicMapComponent = dynamic(
  () => import("../../components/MapComponent"),
  { ssr: false },
);

interface UpdateAddressPageProps {
  addressId: string;
}

const UpdateAddressPage: FC<UpdateAddressPageProps> = ({ addressId }) => {
  const [selectedPosition, setSelectedPosition] = useState<[string, string]>([
    "0",
    "0",
  ]);

  const fetchAddress = async (lat: string, lng: string) => {
    try {
      const { data } = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}&language=id&pretty=1`,
      );
      const results = data.results[0]?.components || {};
      formik.setValues((prevValues) => ({
        ...prevValues,
        address: data.results[0].formatted,
        city: results.county || results.city_district,
        district: results.municipality || results.suburb,
      }));
    } catch (err) {
      console.error("Error fetching address:", err);
    }
  };
  const { data } = useGetAddress(addressId);

  useEffect(() => {
    if (data?.latitude && data.longitude) {
      setSelectedPosition([data.latitude, data.longitude]);
      formik.setValues((prevValues) => ({
        ...prevValues,
        latitude: data.latitude,
        longitude: data.longitude,
      }));
      fetchAddress(data.latitude, data.longitude);
    }
  }, [data?.latitude, data?.longitude]);

  const handlePositionChange = (lat: string, lng: string) => {
    setSelectedPosition([lat, lng]);
    formik.setValues((prevValues) => ({
      ...prevValues,
      latitude: lat,
      longitude: lng,
    }));
    fetchAddress(lat, lng);
  };

  const { mutateAsync: updateAddress, isPending } = useUpdateAddress(data?.id!);

  const formik = useFormik({
    initialValues: {
      name: data?.name!,
      address: data?.address!,
      city: data?.city!,
      district: data?.district!,
      latitude: data?.latitude!,
      longitude: data?.longitude!,
    },
    onSubmit: async (values, { resetForm }) => {
      await updateAddress(values);
      resetForm();
    },
  });

  return (
    <div className="mx-auto my-10 max-w-7xl p-6">
      <h2 className="mb-1 text-xl font-semibold">Ubah Alamat</h2>
      <p className="mb-8 text-sm">
        Perbarui atau tambahkan alamat baru agar proses pengiriman dan
        penjemputan menjadi lebih mudah dan cepat sesuai lokasi pilihan Anda.
      </p>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-md border-[1px]">
          <div className="h-[300px] w-full rounded-md md:h-full">
            <DynamicMapComponent
              selectedPosition={selectedPosition}
              onPositionChange={handlePositionChange}
            />
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="rounded-md border p-6">
          <div className="grid gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Label Alamat</Label>
              <Input
                name="name"
                type="text"
                placeholder="Contoh: Rumah"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-xs text-red-500">{formik.errors.name}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="address">Alamat</Label>
              <Input
                name="address"
                type="text"
                placeholder="Alamat"
                value={formik.values.address}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-xs text-red-500">{formik.errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="city">Kota / Kabupaten</Label>
                <Input
                  name="city"
                  type="text"
                  value={formik.values.city}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.city && formik.errors.city && (
                  <p className="text-xs text-red-500">{formik.errors.city}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="district">Kecamatan</Label>
                <Input
                  name="district"
                  type="text"
                  value={formik.values.district}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.district && formik.errors.district && (
                  <p className="text-xs text-red-500">
                    {formik.errors.district}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  name="latitude"
                  type="text"
                  value={formik.values.latitude}
                  readOnly
                />
                {formik.touched.latitude && formik.errors.latitude && (
                  <p className="text-xs text-red-500">
                    {formik.errors.latitude}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  name="longitude"
                  type="text"
                  value={formik.values.longitude}
                  readOnly
                />
                {formik.touched.longitude && formik.errors.longitude && (
                  <p className="text-xs text-red-500">
                    {formik.errors.latitude}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full md:w-fit"
              >
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAddressPage;
