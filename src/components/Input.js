import React from "react";
import { Field, ErrorMessage } from "formik";
import { TextField } from "formik-material-ui";
import { Box } from "@material-ui/core";

function Input(props) {
  const { label, name, ...rest } = props;
  return (
    <Box padding={1}>
      <Field id={name} name={name} component={TextField} label={label} {...rest} />
    </Box>
  );
}

export default Input;
