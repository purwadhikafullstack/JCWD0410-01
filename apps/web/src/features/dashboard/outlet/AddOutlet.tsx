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
import useCreateOutlet from "@/hooks/api/outlet/useCreateOutlet";

import { useFormik } from "formik";
import { SpinnerCircularFixed } from "spinners-react";
import { AddOutletSchema } from "./schema/AddOutletSchema";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";
import useCurrentLocation from "@/hooks/api/address/useCurrentLocation";

const DynamicMapComponent = dynamic(
  () => import("../../../components/MapComponent"),
  { ssr: false },
);

const AddOutletPage = () => {
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
        city: results.county || results.city || "-",
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
      latitude: String(lat),
      longitude: String(lng),
    }));
    fetchAddress(lat, lng);
  };
  const { mutateAsync: createOutlet, isPending } = useCreateOutlet();
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      latitude: "",
      longitude: "",
    },
    validationSchema: AddOutletSchema,
    onSubmit: async (values, { resetForm }) => {
      await createOutlet(values);
      resetForm();
    },
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-10">
      <h3 className="text-2xl font-semibold">Tambah Outlet</h3>

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
          <Select
            onValueChange={(value) => formik.setFieldValue("type", value)}
            value={formik.values.type}
          >
            <SelectTrigger className="relative z-20">
              <SelectValue placeholder="Pilih tipe outlet" />
            </SelectTrigger>
            <SelectContent className="relative z-20">
              <SelectGroup>
                <SelectLabel>Tipe Outlet</SelectLabel>
                <SelectItem value="MAIN">Utama</SelectItem>
                <SelectItem value="BRANCH">Cabang</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {formik.touched.type && formik.errors.type ? (
            <p className="text-xs text-red-500">{formik.errors.type}</p>
          ) : null}
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
          name="latitude"
          label="Latitude"
          type="text"
          placeholder="Masukkan latitude outlet"
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
          placeholder="Masukkan longitude outlet"
          value={formik.values.longitude}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          isError={!!formik.touched.longitude && !!formik.errors.longitude}
          error={formik.errors.longitude}
        />

        <Button type="submit" disabled={isPending} className="w-full md:w-fit">
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
  );
};

export default AddOutletPage;
