"use client";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useUpdateEmail from "@/hooks/api/user/useChangeEmail";
import { useFormik } from "formik";
import { SpinnerCircularFixed } from "spinners-react";
import { ChangeEmailSchema } from "../schemas/ChangeEmailSchema";

const ChangeEmail = () => {
  const { mutateAsync: updateEmail, isPending } = useUpdateEmail();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ChangeEmailSchema,
    onSubmit: async (values, { resetForm }) => {
      await updateEmail(values);

      resetForm();
    },
  });
  return (
    <>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Ubah Email</CardTitle>
          <CardDescription>
            Ganti alamat email Anda untuk meningkatkan keamanan dan memastikan
            komunikasi yang lancar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <FormInput
              name="email"
              label="Email"
              type="email"
              placeholder="email@domain.com"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isError={!!formik.touched.email && !!formik.errors.email}
              error={formik.errors.email}
            />

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
        </CardContent>
      </Card>
    </>
  );
};

export default ChangeEmail;
