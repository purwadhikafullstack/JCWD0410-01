"use client";

import { FormikHandlers } from "formik";
import { FC } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface FormInputProps {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  value: any;
  error: string | undefined;
  isError: boolean;
  onChange: FormikHandlers["handleChange"];
  onBlur: FormikHandlers["handleBlur"];
  classname?: string;
}

const FormInput: FC<FormInputProps> = ({
  name,
  type,
  label,
  placeholder,
  value,
  error,
  isError,
  onBlur,
  onChange,
  classname,
}) => {
  return (
    <div className={`flex flex-col space-y-2 ${classname}`}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      {isError ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
};

export default FormInput;
