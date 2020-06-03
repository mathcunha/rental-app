import LayoutAdmin from "../components/layoutAdmin";
import { Grid, Paper, Typography, Link } from "@material-ui/core";

export default function Index() {
  return (
    <LayoutAdmin>
      <Grid item xs={12}>
        <Paper className="paper">
          <Typography>
            Welcome to rental admin area.{" "}
            <Link href="/admin/apartments/list"> Apartments </Link>
          </Typography>
        </Paper>
      </Grid>
    </LayoutAdmin>
  );
}
