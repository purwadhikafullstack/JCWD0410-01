import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const LoginSchema = Yup.object().shape({
  //penamaannya harus sama kayak di initialValues
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
