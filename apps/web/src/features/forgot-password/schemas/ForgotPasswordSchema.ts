import * as Yup from "yup";

export const ForgotPasswordSchema = Yup.object().shape({
  //penamaannya harus sama kayak di initialValues
  email: Yup.string().email("Invalid email").required("Email is required"),
});
