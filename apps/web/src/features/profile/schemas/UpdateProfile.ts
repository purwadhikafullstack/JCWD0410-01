import * as Yup from "yup";

const MAX_FILE_SIZE = 1 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const UpdateProfileSchema = Yup.object().shape({
  profilePicture: Yup.mixed()
    .notRequired()
    .test("fileFormat", "Unsupported Format", (value) => {
      // Pastikan bahwa value adalah instance dari File
      return value instanceof File && SUPPORTED_FORMATS.includes(value.type);
    })
    .test("fileSize", "File is too large", (value) => {
      // Pastikan bahwa value adalah instance dari File
      return value instanceof File && value.size <= MAX_FILE_SIZE;
    }),
  name: Yup.string().notRequired(),
  phoneNumber: Yup.string().notRequired(),
});
