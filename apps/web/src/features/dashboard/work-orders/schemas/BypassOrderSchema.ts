import * as Yup from "yup";

export const BypassOrderSchema = Yup.object().shape({
  bypassNote: Yup.string().required("Fill bypass note").min(3).max(255),
});