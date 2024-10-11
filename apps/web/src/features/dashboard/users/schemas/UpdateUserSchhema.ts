// import * as Yup from "yup";
// import YupPassword from "yup-password";
// YupPassword(Yup);

// export const UpdateUserSchema = Yup.object().shape({
//   // name: Yup.string().required("Name is required"),
//   // phoneNumber: Yup.string().required("Phone Number is required"),
//   // email: Yup.string().email("Invalid email").required("Email is required"),
//   oldPassword: Yup.string().when("password", {
//     is: (password: string | undefined) => !!password, // Jika password diisi, oldPassword wajib
//     then: (schema) => schema.required("Old password is required"),
//     otherwise: (schema) => schema.notRequired(), // Jika password tidak diisi, oldPassword tidak wajib
//   }),

//   password: Yup.string()
//     .minLowercase(1, "Password must contain at least 1 lowercase letter")
//     .minNumbers(1, "Password must contain at least 1 number")
//     .minUppercase(1, "Password must contain at least 1 uppercase letter")
//     .minSymbols(1, "Password must contain at least 1 symbol")
//     .min(6, "Password must be at least 6 characters")
//     .nullable()
//     .notRequired(),

//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password")], "Passwords do not match")
//     .when("password", {
//       is: (password: string | undefined) => !!password, // Hanya validasi jika password diisi
//       then: (schema) => schema.required("Confirm password is required"),
//       otherwise: (schema) => schema.notRequired(), // Tidak wajib jika password kosong
//     }),
// });
