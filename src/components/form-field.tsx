import React from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

type BaseProps = {
  label: string;
  name: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  defaultValue?: string | number;
  disabled?: boolean;
};

type InputFieldProps = {
  variant?: "text" | "number";
  type?: React.HTMLInputTypeAttribute;
} & BaseProps;

type TextareaFieldProps = {
  variant: "textarea";
  rows?: number;
} & BaseProps;

type FormFieldProps = InputFieldProps | TextareaFieldProps;

export const FormField: React.FC<FormFieldProps> = (props) => {
  const {
    id,
    name = id,
    label,
    placeholder,
    required = false,
    className = "",
  } = props;

  if (props.variant === "textarea") {
    const { rows = 5, disabled } = props;
    return (
      <div className={`space-y-3 ${className}`}>
        <Label htmlFor={id}>{label}</Label>
        <Textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          rows={rows}
          disabled={disabled} // 👈 here
          className="h-[150px] resize-none p-5"
          defaultValue={props.defaultValue}
        />
      </div>
    );
  }

  const type = props.type ?? "text";
  const { disabled } = props;

  return (
    <div className={`space-y-3 ${className}`}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
        disabled={disabled} // 👈 here too
        className="p-5"
        defaultValue={props.defaultValue}
      />
    </div>
  );
};
