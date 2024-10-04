"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCreateAddress from "@/hooks/api/address/useCreateAddress";
import useCurrentLocation from "@/hooks/api/address/useCurrentLocation";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import FormInput from "@/components/FormInput";
import { AddAddressSchema } from "./schemas/AddAddressSchema";
import { SpinnerCircularFixed } from "spinners-react";

const DynamicMapComponent = dynamic(
  () => import("../../components/MapComponent"),
  { ssr: false },
);

const AddAddressPage = () => {
  const { currentLat, currentLng, error } = useCurrentLocation();
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
        city: results.county || results.city,
        district:
          results.city_district || results.municipality || results.suburb,
      }));
    } catch (err) {
      console.error("Error fetching address:", err);
    }
  };

  useEffect(() => {
    if (currentLat && currentLng) {
      setSelectedPosition([currentLat, currentLng]);
      formik.setValues((prevValues) => ({
        ...prevValues,
        latitude: currentLat,
        longitude: currentLng,
      }));
      fetchAddress(currentLat, currentLng);
    }
  }, [currentLat, currentLng]);

  const handlePositionChange = (lat: string, lng: string) => {
    setSelectedPosition([lat, lng]);
    formik.setValues((prevValues) => ({
      ...prevValues,
      latitude: lat,
      longitude: lng,
    }));
    fetchAddress(lat, lng);
  };

  const { mutateAsync: createAddress, isPending } = useCreateAddress();

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      city: "",
      district: "",
      latitude: selectedPosition[0],
      longitude: selectedPosition[1],
    },
    validationSchema: AddAddressSchema,
    onSubmit: async (values, { resetForm }) => {
      await createAddress(values);
      resetForm();
    },
  });

  return (
    <div className="mx-auto my-10 max-w-7xl p-6">
      <h2 className="mb-1 text-xl font-semibold">Tambah Alamat</h2>
      <p className="mb-8 text-sm">
        Tambahkan alamat baru untuk memudahkan pengiriman atau penjemputan.
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
            <FormInput
              name="name"
              label="Label Alamat"
              type="text"
              placeholder="Contoh: Kosan"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isError={!!formik.touched.name && !!formik.errors.name}
              error={formik.errors.name}
            />
            <FormInput
              name="address"
              label="Alamat"
              type="text"
              placeholder="Contoh: Jalan Contoh"
              value={formik.values.address}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isError={!!formik.touched.address && !!formik.errors.address}
              error={formik.errors.address}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                name="city"
                label="Kota / Kabupaten"
                type="text"
                placeholder=""
                value={formik.values.city || "-"}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                isError={!!formik.touched.city && !!formik.errors.city}
                error={formik.errors.city}
              />
              <FormInput
                name="district"
                label="Kecamatan"
                type="text"
                placeholder=""
                value={formik.values.district || "-"}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                isError={!!formik.touched.district && !!formik.errors.district}
                error={formik.errors.district}
              />
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
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  name="longitude"
                  type="text"
                  value={formik.values.longitude}
                  readOnly
                />
              </div>
            </div>
            <div className="w-full">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full md:w-fit"
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
            </div>
          </div>
        </form>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default AddAddressPage;
