import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "black",
    color: "white",
  },
  title: {
    flexGrow: 1,
    textShadow: "2px 2px lightgrey",
  },
}));

export default function Nav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.header}>
          <Typography variant="h6" className={classes.title}>
            DEXY'S MIDNIGHT BLOGGERS
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
