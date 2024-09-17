import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const CompleteRegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  password: Yup.string()
    .required("Password is required")
    .minLowercase(1)
    .minNumbers(1)
    .minUppercase(1)
    .minSymbols(1)
    .min(6),
});
