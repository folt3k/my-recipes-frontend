import { createMarkUp } from "../helpers/create-mark-up";

type Props = {
  val: string;
};

export const MarkedConverter = ({ val }: Props) => {
  return (
    <div
      className='markdown-wrapper'
      dangerouslySetInnerHTML={createMarkUp(val)}></div>
  );
};
