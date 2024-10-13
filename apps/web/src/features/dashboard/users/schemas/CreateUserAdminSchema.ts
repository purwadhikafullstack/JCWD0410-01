import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

const MAX_FILE_SIZE = 1 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const CreateUserAdminSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  password: Yup.string()
    .required("Password is required")
    .minLowercase(1)
    .minNumbers(1)
    .minUppercase(1)
    .minSymbols(1)
    .min(6),
  profilePicture: Yup.mixed()
    .required("Picture required")
    .test("fileFormat", "Unsupported Format", (value) => {
      return value instanceof File && SUPPORTED_FORMATS.includes(value.type);
    })
    .test("fileSize", "File is too large", (value) => {
      return value instanceof File && value.size <= MAX_FILE_SIZE;
    }),
  phoneNumber: Yup.string().required("Phone number required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  role: Yup.string()
    .required("Role required")
    .equals(["ADMIN", "OUTLET_ADMIN", "WORKER", "DRIVER"]),
  stationId: Yup.string().notRequired(),
  outletId: Yup.string().notRequired(),
});
