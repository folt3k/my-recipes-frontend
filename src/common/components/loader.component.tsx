import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div className="h-full flex justify-center items-center fixed w-full top-0 left-0">
      <CircularProgress size="4rem" />
    </div>
  );
};

export default Loader;
