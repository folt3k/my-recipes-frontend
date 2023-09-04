import { TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { useController } from "react-hook-form";
import autosize from "autosize";

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

export default function AutoSizeTextInput({
  name,
  control,
  rules,
  multiline,
  label,
  color,
  type = "text",
}: Props) {
  const {
    field: { onChange, value },
    formState: { errors },
  } = useController({
    name,
    control,
    rules,
    defaultValue: "",
  });

  const textareaRef = useRef<HTMLInputElement>(null);
  const error = errors[name];

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);

      return () => {
        if (textareaRef.current) {
          autosize.destroy(textareaRef.current);
        }
      };
    }
  }, []);

  return (
    <div className='w-full min-h-[200px]'>
      <TextField
        ref={textareaRef}
        margin='normal'
        color={color}
        onChange={onChange}
        value={value}
        name={name}
        label={label}
        type='textarea'
        multiline={true}
        className='autosize-textarea'
      />
      <ValidateMesage error={error} rules={rules} label={label} />
    </div>
  );
}
