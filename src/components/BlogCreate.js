import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100ch",
    },
  },
}));

export default function BlogCreate() {
  const classes = useStyles();
  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField id="outlined-basic" label="Title" variant="outlined" />
        <TextField
          id="outlined-multiline-flexible"
          label="Blog Post"
          placeholder="Grace us with your knowledge"
          multiline
          rows={10}
          variant="outlined"
        />
      </div>
    </form>
  );
}
