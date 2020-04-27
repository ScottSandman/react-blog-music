import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Fab } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "black",
    color: "white",
    height: 100,
  },
  title: {
    flexGrow: 1,
    textShadow: "2px 2px lightgrey",
  },
  margin: {
    margin: theme.spacing(1),
    bottom: "auto",
    top: 50,
    right: 0,
    left: "auto",
  },
  //   extendedIcon: {
  //     marginRight: theme.spacing(3),
  //   },
}));

export default function Nav({ username, setUsername, content, setContent }) {
  const classes = useStyles();

  async function logout() {
    try {
      const request = await Axios({
        method: "post",
        url: "http://localhost:4000/logout",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setContent("signIn");
      setUsername("");
      console.log(await request);
    } catch (error) {
      console.log(error);
    }
  }

  function renderButtons() {
    if (content === "blog") {
      return (
        <>
          <Fab size="small" className={classes.margin}>
            <PowerSettingsNewIcon onClick={() => logout()} />
          </Fab>
        </>
      );
    } else {
      return <></>;
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.header}>
          <Typography variant="h4" className={classes.title}>
            DEXY'S MIDNIGHT BLOGGERS
          </Typography>
          {renderButtons()}
        </Toolbar>
      </AppBar>
    </div>
  );
}
