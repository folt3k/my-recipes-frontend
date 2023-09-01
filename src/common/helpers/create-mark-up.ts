import { marked } from "marked";

export const createMarkUp = (val: any) => {
  if (!val) {
    return undefined;
  }
  return { __html: marked(val) };
};
