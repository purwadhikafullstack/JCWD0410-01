"use client";

import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { ChangeEvent, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import useCreateUserOrder from "@/hooks/api/order/useCreateUserOrder";

// pickupStatus: 'WAITING_FOR_DRIVER' | 'ONSITE';
// pickupLatitude: string;
// pickupLongitude: string;
// pickupFee: number;
// pickupAddressId: number;
// pickupAddress: string;
// deliveryStatus: 'PROCESSING_LAUNDRY' | 'ONSITE';
// deliveryLatitude: string;
// deliveryLongitude: string;
// deliveryFee: number;
// deliveryAddressId: number;
// outletId: number;
// outletName: string;

const CreateOrderPage = () => {
  const session = useSession();
  const {mutateAsync} = useCreateUserOrder();

  const formik = useFormik({
    initialValues: {
      pickupStatus: "",
      pickupLatitude: "",
      pickupLongitude: "",
      pickupFee: 0,
      pickupAddressId: 0,
      pickupAddress: "",
      deliveryStatus: "",
      deliveryLatitude: "",
      deliveryLongitude: "",
      deliveryFee: 0,
      deliveryAddressId: 0,
      outletId: 0,
      outletName: "",
    },
    validationSchema: null,
    onSubmit: async (values, { resetForm }) => {
      await mutateAsync(values);
      resetForm();
    },
  });

  return (
    <div className="bg-grey1 container mx-auto flex max-w-7xl items-center justify-center">
      <div className="m-4 flex w-[420px] justify-center rounded-3xl bg-[#cee0f7] p-4 shadow">
        <div className="w-96">
          <p className="bg-blue3 text-blue2 mb-4 rounded-xl p-1 text-center text-2xl font-semibold">
            Create Order
          </p>

          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="pickupStatus" className="p-1 font-semibold">
              pickupStatus
            </label>
            <input
              type="text"
              name="pickupStatus"
              id="pickupStatus"
              value={formik.values.pickupStatus}
              placeholder="pickup status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="my-2 mb-4 w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-800"
            />
            <label htmlFor="pickupLatitude" className="p-1 font-semibold">
              pickupLatitude
            </label>
            <input
              type="text"
              name="pickupLatitude"
              id="pickupLatitude"
              value={formik.values.pickupLatitude}
              placeholder="pickupLatitude"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="my-2 w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-800"
            />
            <label htmlFor="pickupLongitude" className="p-1 font-semibold">
              pickupLongitude
            </label>
            <input
              type="text"
              name="pickupLongitude"
              id="pickupLongitude"
              value={formik.values.pickupLongitude}
              placeholder="pickupLongitude"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="my-2 w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-800"
            />
            <label htmlFor="pickupFee" className="p-1 font-semibold">
              pickupFee
            </label>
            <input
              type="number"
              name="pickupFee"
              id="pickupFee"
              value={formik.values.pickupFee}
              placeholder="pickupFee"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="my-2 w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-800"
            />
            <label htmlFor="pickupAddressId" className="p-1 font-semibold">
              pickupAddressId
            </label>
            <input
              type="number"
              name="pickupAddressId"
              id="pickupAddressId"
              value={formik.values.pickupAddressId}
              placeholder="pickupAddressId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="my-2 w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-800"
            />
            <label htmlFor="pickupAddress" className="p-1 font-semibold">
              pickupAddress
            </label>
            <input
              type="text"
              name="pickupAddress"
              id="pickupAddress"
              value={formik.values.pickupAddress}
              placeholder="pickupAddress"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="my-2 w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-800"
            />
            <label htmlFor="deliveryStatus" className="p-1 font-semibold">
              deliveryStatus
            </label>
            <input
              type="text"
              name="deliveryStatus"
              id="deliveryStatus"
              value={formik.values.deliveryStatus}
              placeholder="deliveryStatus"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="my-2 w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-800"
            />
            <label htmlFor="deliveryLatitude" className="p-1 font-semibold">
              deliveryLatitude
            </label>
            <input
              type="text"
              name="deliveryLatitude"
              id="deliveryLatitude"
              value={formik.values.deliveryLatitude}
              placeholder="deliveryLatitude"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="my-2 w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-800"
            />
            <label htmlFor="deliveryLongitude" className="p-1 font-semibold">
              deliveryLongitude
            </label>
            <input
              type="text"
              name="deliveryLongitude"
              id="deliveryLongitude"
              value={formik.values.deliveryLongitude}
              placeholder="deliveryLongitude"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="my-2 w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-800"
            />
            <label htmlFor="deliveryFee" className="p-1 font-semibold">
              deliveryFee
            </label>
            <input
              type="number"
              name="deliveryFee"
              id="deliveryFee"
              value={formik.values.deliveryFee}
              placeholder="deliveryFee"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="my-2 w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-800"
            />
            <label htmlFor="deliveryAddressId" className="p-1 font-semibold">
              deliveryAddressId
            </label>
            <input
              type="number"
              name="deliveryAddressId"
              id="deliveryAddressId"
              value={formik.values.deliveryAddressId}
              placeholder="deliveryAddressId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="my-2 w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-800"
            />
            <label htmlFor="outletId" className="p-1 font-semibold">
              outletId
            </label>
            <input
              type="number"
              name="outletId"
              id="outletId"
              value={formik.values.outletId}
              placeholder="outletId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="my-2 w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-800"
            />
            <label htmlFor="outletName" className="p-1 font-semibold">
              outletName
            </label>
            <input
              type="text"
              name="outletName"
              id="outletName"
              value={formik.values.outletName}
              placeholder="outletName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="my-2 w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-800"
            />
            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-blue-300 p-1 text-center text-xl font-semibold"
            >
              Create Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderPage;
