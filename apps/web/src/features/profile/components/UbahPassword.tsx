"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUpdatePassword from "@/hooks/api/user/useChangePassword";
import { useFormik } from "formik";
import { FC } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import { UpdatePasswordSchema } from "../schemas/UbahPasswordSchema";

const UbahPassword = () => {
  const { mutateAsync: updatePassword, isPending } = useUpdatePassword();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: UpdatePasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      await updatePassword(values);
      resetForm();
    },
  });
  return (
    <div className="space-y-4 rounded-md border-[1px] p-6">
      <h3 className="text-lg">Ubah Password</h3>
      <hr />
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="oldPassword">Password Lama</Label>
          <Input
            name="oldPassword"
            type="password"
            placeholder="Masukkan Password Lama"
            value={formik.values.oldPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {!!formik.touched.oldPassword && !!formik.errors.oldPassword ? (
            <p className="text-xs text-red-500">{formik.errors.oldPassword}</p>
          ) : null}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password Baru</Label>
          <Input
            name="password"
            type="password"
            placeholder="Masukkan Password Baru"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {!!formik.touched.password && !!formik.errors.password ? (
            <p className="text-xs text-red-500">{formik.errors.password}</p>
          ) : null}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Konfirmasi Password Baru</Label>
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Konfirmasi Password"
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {!!formik.touched.confirmPassword &&
          !!formik.errors.confirmPassword ? (
            <p className="text-xs text-red-500">
              {formik.errors.confirmPassword}
            </p>
          ) : null}
        </div>

        <Button className="bg-[#36bbe3]" disabled={isPending} type="submit">
          {isPending ? (
            <div className="flex items-center gap-1">
              <SpinnerCircularFixed size={20} />
              <p className="text-sm">Loading</p>
            </div>
          ) : (
            "Ubah Password"
          )}
        </Button>
      </form>
    </div>
  );
};

export default UbahPassword;
