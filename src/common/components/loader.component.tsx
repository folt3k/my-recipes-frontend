import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <CircularProgress className="mt-[-72px]" size="4rem" />
    </div>
  );
};

export default Loader;
