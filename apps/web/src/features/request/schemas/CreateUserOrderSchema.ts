// import * as Yup from "yup";

// export const CreateUserOrderSchema = Yup.object().shape({
//   title: Yup.string().required("Title is required"),
//   desc: Yup.string().required("Description is required"),
//   location: Yup.string().required("Location is required"),
//   startDate: Yup.date().required("Start date is required"),
//   endDate: Yup.date().required("End date is required"),
//   price: Yup.number()
//     .min(0, "Price must be at least 0")
//     .required("Price is required"),
//   quota: Yup.number()
//     .min(1, "Quota must be at least 1")
//     .required("Quota is required"),
//   img: Yup.mixed().required("Image is required"),
//   categoryId: Yup.number().required("Category is required"),

//   pickupStatus: Yup.string().oneOf(['WAITING_FOR_DRIVER','ONSITE']).required("Either WAITING_FOR_DRIVER or ONSITE required"),
//   pickupLatitude: Yup.string().,
//   pickupLongitude: string,
//   pickupFee: number,
//   pickupAddressId: number,
//   pickupAddress: string,
//   deliveryStatus: "PROCESSING_LAUNDRY" | "ONSITE",
//   deliveryLatitude: string,
//   deliveryLongitude: string,
//   deliveryFee: number,
//   deliveryAddressId: number,
//   outletId: number,
//   outletName: string,
// });
