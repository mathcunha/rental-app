import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PublicIcon from "@material-ui/icons/Public";
import ApartmentIcon from "@material-ui/icons/Apartment";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import PeopleIcon from "@material-ui/icons/People";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Link from "../src/Link";

export const mainListItems = (
  <div>
    <Link href="/">
      <ListItem button>
        <ListItemIcon>
          <LoyaltyIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
    <Link href="/admin/apartments/list">
      <ListItem button>
        <ListItemIcon>
          <ApartmentIcon />
        </ListItemIcon>
        <ListItemText primary="Apartments" />
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
