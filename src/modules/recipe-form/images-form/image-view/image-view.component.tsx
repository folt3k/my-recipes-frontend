import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

type Props = {
  image: { url: string };
  onDelete?: () => void;
};

const ImageView = ({ image, onDelete }: Props) => {
  return (
    <div className="flex flex-row items-start pb-4 mr-3">
      <div
        className="h-[65px] w-[100px] bg-cover bg-center rounded-md"
        style={{ backgroundImage: "url(" + image?.url + ")" }}
      >
        <IconButton
          disableRipple
          type="button"
          onClick={onDelete}
          className="mt-[-30px] ml-[-15px] z-10"
        >
          <ClearIcon fontSize="small" color="secondary" className="bg-gray rounded-full p-[2px] " />
        </IconButton>
      </div>
    </div>
  );
};

export default ImageView;
