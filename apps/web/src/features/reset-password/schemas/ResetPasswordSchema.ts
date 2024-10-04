import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const ResetPasswordSchema = Yup.object().shape({
  //penamaannya harus sama kayak di initialValues
  password: Yup.string()
    .required("Password is required")
    .minLowercase(1)
    .minNumbers(1)
    .minUppercase(1)
    .minSymbols(1)
    .min(6),

  confirmPassword: Yup.string()
    .required("Confirm Password")
    .oneOf([Yup.ref("password")], "Your password do not match"),
});
