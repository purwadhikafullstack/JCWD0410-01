import * as Yup from "yup";

export const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
});
