import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    border: "2px solid grey",
    borderRadius: 10,
    marginTop: 10,
  },
  headingParent: {
    bottom: 0,
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
    textShadow: "2px 2px lightgrey",
  },
  headingSub: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginLeft: 20,
  },
  post: {
    display: "flex",
    textAlign: "justify",
    marginLeft: 20,
    marginRight: 20,
  },
}));

export default function BlogPanel({ blog }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.headingParent}
        >
          <Typography className={classes.heading}>{blog.title}</Typography>

          <Typography className={classes.headingSub}>
            <br />
            {" written by "}
            {blog.username}
            {" on "}
            {blog.date.slice(0, 10)}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className={classes.post}>{blog.post}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
