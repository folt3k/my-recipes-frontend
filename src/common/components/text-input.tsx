import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

import { BaseCustomControlProps } from "../types/form";
import ValidateMessage from "./validation-message";

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

function TextInput({
  name,
  control,
  rules,
  multiline,
  label,
  color,
  type = "text",
}: Props) {
  return (
    <div className="w-full">
      <Controller
        render={({
          field: { value, onChange, ref },
          fieldState: { error },
        }) => (
          <>
            <TextField
              margin="normal"
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
            <ValidateMessage error={error} rules={rules} label={label} />
          </>
        )}
        name={name}
        control={control}
        rules={rules}
        defaultValue=""
      />
    </div>
  );
}

export default TextInput;
