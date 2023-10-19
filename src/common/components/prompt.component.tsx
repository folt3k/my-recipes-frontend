import { unstable_useBlocker as useBlocker } from "react-router-dom";

const Prompt = (props: { when: boolean; message: string }): JSX.Element => {
  const block = props.when;

  useBlocker(() => {
    if (block) {
      return !window.confirm(props.message);
    }
    return false;
  });

  return <></>;
};

export default Prompt;
