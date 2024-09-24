"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUpdateEmail from "@/hooks/api/user/useChangeEmail";
import { useFormik } from "formik";
import { UpdateEmailSchema } from "../schemas/UbahEmailSchema";
import { SpinnerCircularFixed } from "spinners-react";
import { FC } from "react";

const UbahEmail = () => {
  const { mutateAsync: updateEmail, isPending } = useUpdateEmail();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: UpdateEmailSchema,
    onSubmit: async (values, { resetForm }) => {
      await updateEmail(values);

      resetForm();
    },
  });
  return (
    <div className="space-y-4 rounded-md border-[1px] p-6">
      <h3 className="text-lg">Ubah Email</h3>
      <hr />
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email" className="font-semibold">
            Email
          </Label>
          <Input
            name="email"
            type="email"
            placeholder="email@domain.com"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {!!formik.touched.email && !!formik.errors.email ? (
            <p className="text-xs text-red-500">{formik.errors.email}</p>
          ) : null}

          <p className="text-sm text-neutral-500">
            Email akan berubah ketika Anda sudah menekan link verifikasi yang
            dikirimkan ke email baru Anda.
          </p>
        </div>

        <Button className="bg-[#36bbe3]" disabled={isPending} type="submit">
          {isPending ? (
            <div className="flex items-center gap-1">
              <SpinnerCircularFixed size={20} />
              <p className="text-sm">Loading</p>
            </div>
          ) : (
            "Ubah Email"
          )}
        </Button>
      </form>
    </div>
  );
};

export default UbahEmail;
