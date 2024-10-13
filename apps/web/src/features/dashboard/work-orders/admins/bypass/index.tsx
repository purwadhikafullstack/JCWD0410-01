"use client";

import DashboardHeader from "@/components/DashboardHeader";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useBypassWorkOrder from "@/hooks/api/work/useBypassWorkOrder";
import useGetWorkOrderAdmins from "@/hooks/api/work/useGetWorkOrderAdmins";
import {
  FormikValues,
  useFormik
} from "formik";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import { BypassOrderSchema } from "../../schemas/BypassOrderSchema";

interface CountState {
  num: number;
  arr: number[];
}

const DashboardWorkOrderBypassPage = () => {
  const session = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { mutateAsync: bypassOrder, isPending } = useBypassWorkOrder();
  const { data: workOrder, isPending: workOrderPending } =
    useGetWorkOrderAdmins(Number(id));

  const formik = useFormik({
    initialValues: {
      bypassNote: "",
    },
    validationSchema: BypassOrderSchema,
    onSubmit: async (values) => {
      await bypassOrder({bypassNote: values.bypassNote, id: Number(id)});
    },
  });

  if (!session.data) {
    return <DashboardHeader />;
  }
  if (workOrderPending) {
    return (
      <>
        <DashboardHeader />
      </>
    );
  }
  if (!workOrder) {
    return <>{router.push("/dashboard")}</>;
  }

  if (
    session.data.user.role === "ADMIN" ||
    session.data.user.role === "OUTLET_ADMIN"
  ) {
    return (
      <>
        <DashboardHeader />
        <div className="text-md md: mx-auto h-full bg-white p-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Bypass order</CardTitle>
              <CardDescription>Fill the following bypass note</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={formik.handleSubmit}>
                <FormInput
                  name="bypassNote"
                  label="Note"
                  type="text"
                  placeholder="Masukkan bypass note"
                  value={formik.values.bypassNote}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isError={
                    !!formik.touched.bypassNote && !!formik.errors.bypassNote
                  }
                  error={formik.errors.bypassNote}
                />

                <Button
                  className="bg-[#36bbe3]"
                  disabled={isPending}
                  type="submit"
                >
                  {isPending ? (
                    <div className="flex items-center gap-1">
                      <SpinnerCircularFixed size={20} />
                      <p className="text-sm">Loading</p>
                    </div>
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </>
    );
  } else {
    return (
      <>
        <nav className="fixed z-50 h-20 w-full content-center bg-blue-200 p-3 md:w-[calc(100%-256px)]"></nav>
        <div className="md: mx-auto h-full bg-white p-4 pt-24 text-xl font-bold">
          <>{router.push("/dashboard")}</>
        </div>
      </>
    );
  }
};

export default DashboardWorkOrderBypassPage;
