"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUpdateProfile from "@/hooks/api/user/useUpdateProfile";
import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, FC, useRef, useState } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import { UpdateProfileSchema } from "../schemas/UpdateProfile";
import FormInput from "@/components/FormInput";

interface UpdateProfileProps {
  name: string;
  phoneNumber: string;
}

const UpdateProfile: FC<UpdateProfileProps> = ({ name, phoneNumber }) => {
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

  const formik = useFormik({
    initialValues: {
      profilePicture: "",
      name,
      phoneNumber,
    },
    // validationSchema: UpdateProfileSchema,
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
    <Card className="shadow">
      <CardHeader>
        <CardTitle className="text-xl">Ubah Profile</CardTitle>
        <CardDescription>
          Perbarui informasi profil Anda untuk memastikan data Anda selalu
          akurat dan terkini.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="profilePicture" className="font-semibold">
              Profile Picture
            </Label>
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
          </div>

          <FormInput
            name="name"
            label="Nama"
            type="text"
            placeholder="Masukkan nama anda"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isError={!!formik.touched.name && !!formik.errors.name}
            error={formik.errors.name}
          />
          <FormInput
            name="phoneNumber"
            label="Nomor Handphone"
            type="text"
            placeholder="Masukkan nomor handphone anda"
            value={formik.values.phoneNumber}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isError={
              !!formik.touched.phoneNumber && !!formik.errors.phoneNumber
            }
            error={formik.errors.phoneNumber}
          />

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
      </CardContent>
    </Card>
  );
};

export default UpdateProfile;
