import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { DatePicker as DatePickerFormik } from "formik-material-ui-pickers";
import { Box } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function DatePicker(props) {
  const { label, name, ...rest } = props;
  return (
    <Box padding={1}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Field component={DatePickerFormik} label={label} name={name} {...rest} />
        <ErrorMessage component={TextError} name={name} />
      </MuiPickersUtilsProvider>
    </Box>
  );
}

export default DatePicker;
