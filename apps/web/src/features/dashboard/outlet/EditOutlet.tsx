"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetOutlet from "@/hooks/api/outlet/useGetOutlet";
import useUpdateOutlet from "@/hooks/api/outlet/useUpdateOutlet";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import { AddOutletSchema } from "./schema/AddOutletSchema";
import dynamic from "next/dynamic";
import axios from "axios";
import DashboardHeader from "@/components/DashboardHeader";

const DynamicMapComponent = dynamic(
  () => import("../../../components/MapComponent"),
  { ssr: false },
);

interface EditOutletPageProps {
  outletId: string;
}

const EditOutletPage: FC<EditOutletPageProps> = ({ outletId }) => {
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

  const { data, isPending: isLoading } = useGetOutlet(outletId);

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

  const { mutateAsync: updateOutlet, isPending } = useUpdateOutlet(outletId);

  if (isLoading) {
    <div>...Loading</div>;
  }
  const formik = useFormik({
    initialValues: {
      name: data?.name!,
      type: data?.type!,
      address: data?.address!,
      latitude: data?.latitude!,
      longitude: data?.longitude!,
    },
    validationSchema: AddOutletSchema,
    onSubmit: async (values, { resetForm }) => {
      await updateOutlet(values);
      resetForm();
    },
    enableReinitialize: true,
  });
  return (
    <div>
      <div className="mx-auto max-w-7xl p-4">
        <div className="space-y-8 md:rounded-md md:border-[1px] md:bg-white md:p-4">
          <h3 className="text-2xl font-semibold text-[#38b9e3]">Edit Outlet</h3>
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <FormInput
              name="name"
              label="Nama Outlet"
              type="text"
              placeholder="Masukkan nama outlet"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isError={!!formik.touched.name && !!formik.errors.name}
              error={formik.errors.name}
            />
            <div className="space-y-1.5">
              <Label>Tipe Outlet</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe outlet" />
                </SelectTrigger>
                <SelectContent side="top">
                  <SelectGroup>
                    <SelectLabel>Tipe Outlet</SelectLabel>
                    <SelectItem value="MAIN">Utama</SelectItem>
                    <SelectItem value="BRANCH">Cabang</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full overflow-hidden rounded-md border-[1px]">
              <div className="h-[300px] w-full rounded-md md:h-[400px]">
                <DynamicMapComponent
                  selectedPosition={selectedPosition}
                  onPositionChange={handlePositionChange}
                />
              </div>
            </div>

            <FormInput
              name="addrss"
              label="Alamat"
              type="text"
              placeholder="Masukkan alamat anda"
              value={formik.values.address}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isError={!!formik.touched.address && !!formik.errors.address}
              error={formik.errors.address}
            />

            <FormInput
              name="latitude"
              label="Latitude"
              type="text"
              placeholder="Masukkan nama outlet"
              value={formik.values.latitude}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isError={!!formik.touched.latitude && !!formik.errors.latitude}
              error={formik.errors.latitude}
            />
            <FormInput
              name="longitude"
              label="Longitude"
              type="text"
              placeholder="Masukkan nama outlet"
              value={formik.values.longitude}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isError={!!formik.touched.longitude && !!formik.errors.longitude}
              error={formik.errors.longitude}
            />
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditOutletPage;
