import Grid from "@material-ui/core/Grid";
import ButtonSubmit from "./buttonSubmit";
import ButtonDelete from "./buttonDelete";
import DeleteDialog from "./deleteDialog";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useState, Fragment } from "react";

const ActionButtons = ({
  isNew,
  loading,
  action,
  onSave,
  saveLabel,
  onDelete,
  success,
  onSuccess,
  error,
}) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    setShowDialog(true);
  };

  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={1000}
        open={success}
        onClose={onSuccess}
      >
        <Alert severity="success" />
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        autoHideDuration={1000}
        open={error !== ""}
      >
        <Alert severity="error" />
      </Snackbar>
      {isNew === false ? (
        <Grid container>
          <Grid item xs={6}>
            <ButtonSubmit
              onSubmit={onSave}
              label={saveLabel ? saveLabel : "Update"}
              load={loading}
              action={action}
            />
          </Grid>
          <Grid item xs={6}>
            <ButtonDelete
              onSubmit={handleDelete}
              label="Delete"
              load={loading}
              action={action}
            />
          </Grid>
          <DeleteDialog
            open={showDialog}
            setOpen={setShowDialog}
            onAgree={onDelete}
          />
        </Grid>
      ) : (
        <Grid item xs={12}>
          <ButtonSubmit
            onSubmit={onSave}
            label={saveLabel ? saveLabel : "Save"}
            load={loading}
            action={action}
          />
        </Grid>
      )}
    </Fragment>
  );
};

export default ActionButtons;
