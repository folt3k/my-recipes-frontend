import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

import { BaseCustomControlProps } from "../types/form";
import ValidateMesage from "./validation-message";

type Props = {
  color?:
    | "error"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | undefined;
  type?: string;
  multiline?: boolean;
} & BaseCustomControlProps;

export default function TextInput({
  name,
  control,
  rules,
  multiline,
  label,
  color,
  type = "text",
}: Props) {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue: "",
  });
  return (
    <div className='w-full'>
      <TextField
        margin='normal'
        color={color}
        onChange={onChange}
        value={value}
        name={name}
        label={label}
        type={type}
        multiline={multiline}
        rows={multiline ? 10 : 0}
        inputRef={ref}
      />
      <ValidateMesage error={error} rules={rules} label={label} />
    </div>
  );
}
