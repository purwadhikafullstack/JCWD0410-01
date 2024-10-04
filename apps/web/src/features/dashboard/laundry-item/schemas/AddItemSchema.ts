import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const AddLaundryItemSchema = Yup.object().shape({
  name: Yup.string().required("Item name is required"),
});
