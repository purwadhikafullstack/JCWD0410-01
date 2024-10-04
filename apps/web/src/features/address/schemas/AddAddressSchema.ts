import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const AddAddressSchema = Yup.object().shape({
  name: Yup.string().required("Label name is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  district: Yup.string().required("District is required"),
  latitude: Yup.number().required("Latitude is required"),
  longitude: Yup.number().required("Longitude is required"),
});
