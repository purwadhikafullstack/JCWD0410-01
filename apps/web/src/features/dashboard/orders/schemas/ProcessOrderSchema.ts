import * as Yup from "yup";

export const ProcessOrderSchema = Yup.object().shape({
  weight: Yup.number().required("Weight is required").min(1),
  orderId: Yup.number(),
  orderItems: Yup.array().of(Yup.object().shape({
    name: Yup.string().required("Name is required").min(3),
    itemQuantity: Yup.number().required("Quantity minimum of 1").min(1),
    laundryItemId: Yup.number().required("Laundry Item required").not([0])
  })).required("Item required"),
});
