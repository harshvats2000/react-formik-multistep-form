import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { Select as SelectFormik } from "formik-material-ui";
import { Box, InputLabel, FormControl, MenuItem } from "@material-ui/core";

function Select(props) {
  const { label, name, options = [], ...rest } = props;
  return (
    <Box padding={1}>
      <FormControl>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Field component={SelectFormik} name={name} {...rest}>
          {options.map((option) => {
            return (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            );
          })}
        </Field>
        <ErrorMessage component={TextError} name={name} />
      </FormControl>
    </Box>
  );
}

export default Select;
