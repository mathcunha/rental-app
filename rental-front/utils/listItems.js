import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import PublicIcon from "@material-ui/icons/Public";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Link from "../src/Link";

export const mainListItems = (
  <div>
    <Link href="/admin/apartments/list">
      <ListItem button>
        <ListItemIcon>
          <LoyaltyIcon />
        </ListItemIcon>
        <ListItemText primary="Apartments" />
      </ListItem>
    </Link>
    <Link href="/admin/apartments/list">
      <ListItem button>
        <ListItemIcon>
          <PublicIcon />
        </ListItemIcon>
        <ListItemText primary="Rentals" />
      </ListItem>
    </Link>
    <Link href="/admin/users/list">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
    </Link>
    <Link href="/auth/signout">
      <ListItem button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Signout" />
      </ListItem>
    </Link>
    <style jsx>
      {`
        a {
          color: rgba(0, 0, 0, 0.87);
        }
        a:hover {
          text-decoration: none;
        }
      `}
    </style>
  </div>
);
