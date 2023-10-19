import { marked } from "marked";

export const createMarkUp = (val: string) => {
  if (!val) {
    return undefined;
  }

  return { __html: marked.parse(val) };
};
