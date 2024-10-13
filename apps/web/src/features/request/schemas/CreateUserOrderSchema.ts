import * as Yup from "yup";

export const CreateUserOrderSchema = Yup.object().shape({
  pickupLatitude: Yup.string().required("Pickup Latitude is required"),
  pickupLongitude: Yup.string().required("Pickup Longitude is required"),
  pickupFee: Yup.number().required("Pickup fee required"),
  pickupAddressId: Yup.number().required("Pickup address Id required"),
  pickupAddress: Yup.string().required("Pickup Address required"),
  deliveryLatitude: Yup.string().required("Delivery Latitude is required"),
  deliveryLongitude: Yup.string().required("Delivery Longitude is required"),
  deliveryFee: Yup.number().required("Delviery fee required"),
  deliveryAddressId: Yup.number().required("Delivery address Id required"),
  outletId: Yup.number().required("Outlet Id required"),
  outletName: Yup.string().required("Outlet name is required"),
});
