import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useCreateLaundryItem from "@/hooks/api/laundry-item/useCreateLaundryItem";
import { useFormik } from "formik";
import { FaPlus } from "react-icons/fa6";
import { SpinnerCircularFixed } from "spinners-react";
import { AddLaundryItemSchema } from "../schemas/AddItemSchema";

const AddItem = () => {
  const { mutateAsync: createLaundryItem, isPending } = useCreateLaundryItem();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: AddLaundryItemSchema,
    onSubmit: async (values, { resetForm }) => {
      await createLaundryItem(values);
      resetForm();
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1" type="button">
          <FaPlus /> <p>Tambah Item</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Item</DialogTitle>
          <DialogDescription>
            Silakan tambahkan item laundry baru
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <FormInput
            name="name"
            label="Nama"
            type="text"
            placeholder="Masukkan nama item"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isError={!!formik.touched.name && !!formik.errors.name}
            error={formik.errors.name}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full md:w-fit"
            >
              {isPending ? (
                <div className="flex items-center gap-1">
                  <SpinnerCircularFixed size={20} />
                  <p className="text-sm">Loading</p>
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItem;
