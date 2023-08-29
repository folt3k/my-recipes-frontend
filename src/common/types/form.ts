import { Control } from "react-hook-form";

export type CustomControlRules = {
  [key: string]:
    | boolean
    | number
    | RegExp
    | ({ [key: string]: (value: string) => boolean | string } | undefined);
  validate?: { [key: string]: (value: string) => boolean | string };
};

export type BaseCustomControlProps = {
  name: string;
  control: Control<any> | undefined;
  rules: CustomControlRules;
  label: string;
};
