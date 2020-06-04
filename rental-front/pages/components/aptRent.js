import { Snackbar } from "@material-ui/core";

const AptRent = ({ open, setOpen }) => {
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={handleClose}
      message="Rent proposal sent to the owner"
    />
  );
};

export default AptRent;
