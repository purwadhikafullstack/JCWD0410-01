import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useGetLaundryItem from "@/hooks/api/laundry-item/useGetLaundryItem";
import useUpdateLaundryItem from "@/hooks/api/laundry-item/useUpdateLaundryItem";
import { useFormik } from "formik";
import { FC } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import { AddLaundryItemSchema } from "../schemas/AddItemSchema";

interface EditItemProps {
  laundryItemId: number;
}

const EditItem: FC<EditItemProps> = ({ laundryItemId }) => {
  const { mutateAsync: updateLaundryItem, isPending } =
    useUpdateLaundryItem(laundryItemId);
  const { data, refetch } = useGetLaundryItem(laundryItemId);

  const formik = useFormik({
    initialValues: {
      name: data?.name!,
    },
    validationSchema: AddLaundryItemSchema,
    onSubmit: async (values, { resetForm }) => {
      await updateLaundryItem(values);
      refetch();
    },
    enableReinitialize: true,
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          <p>Edit</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>
            Update laundry item information.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <FormInput
            name="name"
            label="Name"
            type="text"
            // placeholder="Masukkan nama item"
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

export default EditItem;
