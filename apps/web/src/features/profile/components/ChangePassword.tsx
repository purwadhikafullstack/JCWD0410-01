"use client";
import AlertDialogDemo from "@/components/AlertDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUpdatePassword from "@/hooks/api/user/useChangePassword";
import { useFormik } from "formik";
import { ChangePasswordSchema } from "../schemas/ChangePassword";
import FormInput from "@/components/FormInput";

const ChangePassword = () => {
  const { mutateAsync: updatePassword, isPending } = useUpdatePassword();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      await updatePassword(values);
      resetForm();
    },
  });

  const handleConfirmSubmit = async () => {
    await formik.handleSubmit();
  };

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Ubah Password</CardTitle>
          <CardDescription>
            Amankan akun Anda dengan mengganti kata sandi secara berkala untuk
            perlindungan tambahan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <FormInput
              name="oldPassword"
              label="Password Lama"
              type="password"
              placeholder="Masukkan Password Lama"
              value={formik.values.oldPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isError={
                !!formik.touched.oldPassword && !!formik.errors.oldPassword
              }
              error={formik.errors.oldPassword}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormInput
                name="password"
                label="Password Baru"
                type="password"
                placeholder="Masukkan Password Baru"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                isError={!!formik.touched.password && !!formik.errors.password}
                error={formik.errors.password}
              />

              <FormInput
                name="confirmPassword"
                label="Konfirmasi Password"
                type="password"
                placeholder="Konfirmasi Password"
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                isError={
                  !!formik.touched.confirmPassword &&
                  !!formik.errors.confirmPassword
                }
                error={formik.errors.confirmPassword}
              />
            </div>
            <AlertDialogDemo
              classname="bg-[#37bae3] text-sm px-4 py-2 text-white rounded-md"
              action="Ubah Password"
              title="Apakah Anda Yakin?"
              description="Tindakan ini akan mengganti password akun Anda. Pastikan untuk mengingat password baru agar tetap dapat mengakses akun Anda dengan aman."
              onclick={handleConfirmSubmit}
              disabled={isPending}
            />
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default ChangePassword;
