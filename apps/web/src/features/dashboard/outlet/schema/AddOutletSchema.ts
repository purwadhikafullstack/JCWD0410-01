import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const AddOutletSchema = Yup.object().shape({
  name: Yup.string().required("Outlet name is required"),
  type: Yup.string().required("Outlet type is required"),
  latitude: Yup.string().required("Latitude is required"),
  longitude: Yup.string().required("Longitude is required"),
});
