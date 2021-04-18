import React from "react";
import Input from "./Input";
import Select from "./Select";
import DatePicker from "./DatePicker";
import CheckboxGroup from "./CheckboxGroup";
import RadioButtons from "./RadioButtons";
import Textarea from "./TextArea";

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "checkbox":
      return <CheckboxGroup {...rest} />;
    default:
      return <Input {...rest} />;
  }
}

export default FormikControl;
