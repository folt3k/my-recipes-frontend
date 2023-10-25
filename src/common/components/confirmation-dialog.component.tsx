import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

export type Props = {
  title: string;
  open: boolean;
  message?: string;
  loadingWhenConfirm?: boolean;
  onClose: (value: boolean) => void;
};

export const ConfirmationDialog = ({
  open,
  onClose,
  message,
  title,
  loadingWhenConfirm,
}: Props) => {
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const handleDeny = () => {
    onClose(false);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    onClose(true);
  };

  const loading: boolean = !!loadingWhenConfirm && confirmed;

  return (
    <Dialog maxWidth="sm" fullWidth open={open}>
      <DialogTitle>{title}</DialogTitle>
      {message && (
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button variant="outlined" autoFocus onClick={handleDeny} disabled={loading}>
          Nie
        </Button>

        <Button onClick={handleConfirm} variant="contained" disabled={loading}>
          <div className="flex justify-center items-center">
            {loading && <CircularProgress color="inherit" size="1rem" thickness={5} className="mr-1" />}
            <span>Tak</span>
          </div>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
