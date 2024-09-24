"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUpdateProfile from "@/hooks/api/user/useUpdateProfile";
import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, FC, useRef, useState } from "react";
import { SpinnerCircularFixed } from "spinners-react";

interface UbahProfileProps {
  name: string;
  phoneNumber: string;
}

const UbahProfile: FC<UbahProfileProps> = ({ name, phoneNumber }) => {
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

  const formik = useFormik({
    initialValues: {
      profilePicture: "",
      name,
      phoneNumber,
    },
    // validationSchema: UpdateEmailSchema,
    onSubmit: async (values) => {
      await updateProfile(values);
    },
  });

  const [selectedImage, setSelectedImage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeProfilePicture = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      formik.setFieldValue("profilePicture", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };

  const removeSelectedImage = () => {
    formik.setFieldValue("profilePsicture", null);
    setSelectedImage("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4 rounded-md border-[1px] p-6">
      <h3 className="text-lg">Ubah Profil</h3>
      <hr />
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="profilePicture" className="font-semibold">
            Profile Picture
          </Label>
          <p className="text-xs text-neutral-500">
            Gambar Profile Anda sebaiknya memiliki rasio 1:1 dan berukuran tidak
            lebih dari 1MB.
          </p>
        </div>
        {selectedImage ? (
          <>
            <div className="relative h-[150px] w-[150px]">
              <Image
                src={selectedImage}
                alt="Blog thumbnail"
                fill
                className="object-cover"
              />
            </div>
            <button
              onClick={removeSelectedImage}
              className="text-sm text-red-600"
            >
              remove
            </button>
          </>
        ) : null}

        <Input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onChangeProfilePicture}
          className="my-1"
        />
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name" className="font-semibold">
            Name
          </Label>
          <Input
            name="name"
            type="text"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {!!formik.touched.name && !!formik.errors.name ? (
            <p className="text-xs text-red-500">{formik.errors.name}</p>
          ) : null}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="phoneNumber" className="font-semibold">
            Nomor Handphone
          </Label>
          <Input
            name="phoneNumber"
            type="text"
            placeholder="Masukkan nomor handphone"
            value={formik.values.phoneNumber}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {!!formik.touched.phoneNumber && !!formik.errors.phoneNumber ? (
            <p className="text-xs text-red-500">{formik.errors.phoneNumber}</p>
          ) : null}
        </div>

        <Button className="bg-[#36bbe3]" disabled={isPending} type="submit">
          {isPending ? (
            <div className="flex items-center gap-1">
              <SpinnerCircularFixed size={20} />
              <p className="text-sm">Loading</p>
            </div>
          ) : (
            "Simpan Perubahan"
          )}
        </Button>
      </form>
    </div>
  );
};

export default UbahProfile;
