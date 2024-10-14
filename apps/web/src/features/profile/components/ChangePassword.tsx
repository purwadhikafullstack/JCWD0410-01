"use client";
import AlertDialogDemo from "@/components/AlertDialog";
import FormInput from "@/components/FormInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useUpdatePassword from "@/hooks/api/user/useChangePassword";
import { useFormik } from "formik";
import { ChangePasswordSchema } from "../schemas/ChangePassword";

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
      <Card className="shadow">
        <CardHeader>
          <CardTitle className="text-xl">Change Password</CardTitle>
          <CardDescription>
            Secure your account by changing your password regularly for added
            protection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <FormInput
              name="oldPassword"
              label="Current Password"
              type="password"
              placeholder="Enter current password"
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
                label="New Password"
                type="password"
                placeholder="Enter new password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                isError={!!formik.touched.password && !!formik.errors.password}
                error={formik.errors.password}
              />

              <FormInput
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Enter Confirmation Password"
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
              action="Submit"
              title="Are you sure?"
              description="This action will change your account password. Make sure to remember your new password to securely maintain access to your account."
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
