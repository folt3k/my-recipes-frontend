import { Alert, Snackbar as SnackbarMui } from "@mui/material";

type Props = {
  open: boolean;
  message: string;
  handleClose: () => void;
};

const Snackbar = ({ open, message, handleClose }: Props) => {
  return (
    <SnackbarMui
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}>
      <Alert severity='error'>{message}</Alert>
    </SnackbarMui>
  );
};

export default Snackbar;
