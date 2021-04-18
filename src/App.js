import React, { useState } from "react";
import { Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper, TextField, Select } from "@material-ui/core";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./App.css";
import FormikControl from "./components/FormikControl";
import ageFromDOB from "./utils/ageFromDOB";
import {
  BattingStyleOptions,
  BowlingStyleOptions,
  CricketOptions,
  SportOptions,
  CountryOptions,
  MidFielderStyleOptions,
  DefenderStyleOptions,
  ForwardStyleOptions,
  FootballOptions
} from "./constants";

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

const validationSchema1 = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid Email format.").required("Required"),
  psw: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  sport: Yup.string().required("Required")
});
const validationSchema2 = Yup.object({
  role: Yup.string().required("Role is Required"),
  bowling_style: Yup.array().when(["role"], {
    is: (role) => role === "bowler" || role === "all-rounder",
    then: Yup.array().min(1, "Select atleast one bowling style.")
  }),
  batting_style: Yup.array().when(["role"], {
    is: (role) => role === "batsmen" || role === "wicket-keeper" || role === "all-rounder",
    then: Yup.array().min(1, "Select atleast one batting style.")
  })
});
const validationSchema3 = Yup.object({
  profile: Yup.string().test("len", "Profile must be greater than 20 characters", (val) => val?.length >= 20)
});

export default function Home() {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    psw: "",
    country: "",
    sport: "",
    dob: new Date().getTime(),
    matchesPlayed: 0,
    role: "",
    batting_style: [],
    bowling_style: [],
    defender_style: "",
    midfielder_style: "",
    forward_style: "",
    profile: "",
    runs: "",
    hundreds: "",
    batting_average: "",
    wickets: "",
    bowling_average: "",
    hattricks: "",
    goals: "",
    assists: "",
    passes: "",
    interceptions: "",
    goals_saved: ""
  };
  const onSubmit = async (values) => {
    await sleep(3000);
    alert(JSON.stringify(values, null, 2));
  };
  const [formData, setFormData] = useState(initialValues);

  return (
    <Card>
      <CardContent>
        <FormikStepper initialValues={initialValues} onSubmit={onSubmit} setFormData={setFormData}>
          <FormikStep label="Step 1" validationSchema={validationSchema1}>
            <FormikControl name="firstName" type="text" label="First Name" />

            <FormikControl name="lastName" type="text" label="Last Name" />

            <FormikControl name="email" type="email" label="Your email" />

            <FormikControl name="psw" type="password" label="Password" />

            <FormikControl control="select" options={CountryOptions} label="Select your Country" name="country" />

            <FormikControl control="select" options={SportOptions} label="Select your Sport" name="sport" />
          </FormikStep>

          <FormikStep label="Step 2" validationSchema={validationSchema2}>
            <FormikControl control="date" label="Select your DOB" name="dob" />

            <Field>
              {({ form }) => {
                const date = new Date(form.values.dob);
                let age = ageFromDOB(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
                return <p>AGE: {age} years</p>;
              }}
            </Field>

            <FormikControl name="matchesPlayed" type="number" label="matches played" placeholder="matches played" />

            <Field>
              {({ form }) => {
                const { role, sport } = form.values;
                if (sport === "cricket") {
                  return (
                    <>
                      <FormikControl control="select" options={CricketOptions} label="Select your role" name="role" placeholder="Your role" />

                      {role === "batsmen" || role === "wicket-keeper" ? (
                        <FormikControl control="checkbox" name="batting_style" options={BattingStyleOptions} label="Batting style" />
                      ) : null}

                      {role === "bowler" ? (
                        <FormikControl control="checkbox" name="bowling_style" options={BowlingStyleOptions} label="Select your bowling style" />
                      ) : null}

                      {role === "all-rounder" ? (
                        <>
                          <FormikControl control="checkbox" name="batting_style" options={BattingStyleOptions} label="Select your batting style" />
                          <FormikControl control="checkbox" name="bowling_style" options={BowlingStyleOptions} label="Select your bowling style" />
                        </>
                      ) : null}
                    </>
                  );
                } else if (sport === "football") {
                  return (
                    <>
                      <FormikControl control="select" options={FootballOptions} label="Select your role" name="role" placeholder="Your role" />

                      {role === "defender" ? (
                        <FormikControl control="radio" name="defender_style" options={DefenderStyleOptions} label="Select your defender style" />
                      ) : null}

                      {role === "mid-fielder" ? (
                        <FormikControl
                          control="radio"
                          name="midfielder_style"
                          options={MidFielderStyleOptions}
                          label="Select your mid fielder style"
                        />
                      ) : null}

                      {role === "forward" ? (
                        <FormikControl control="radio" name="forward_style" options={ForwardStyleOptions} label="Select your forward style" />
                      ) : null}
                    </>
                  );
                } else {
                  return <></>;
                }
              }}
            </Field>
          </FormikStep>

          <FormikStep label="Step 3" validationSchema={validationSchema3}>
            <FormikControl control="textarea" label="Your profile" name="profile" />

            <Field>
              {({ form }) => {
                const { sport, role } = form.values;
                if (sport === "cricket") {
                  return (
                    <>
                      {role === "batsmen" ? (
                        <>
                          <FormikControl name="runs" type="number" label="Number of runs" />
                          <FormikControl name="hundreds" type="number" label="Number of hunderds" />
                          <FormikControl name="batting_average" type="number" label="Batting average" />
                        </>
                      ) : null}

                      {role === "bowler" ? (
                        <>
                          <FormikControl name="wickets" type="number" label="Number of wickets" />
                          <FormikControl name="hattricks" type="number" label="Number of hattricks" />
                          <FormikControl name="bowlingg_average" type="number" label="Bowling average" />
                        </>
                      ) : null}

                      {role === "all-rounder" ? (
                        <>
                          <FormikControl name="runs" type="number" label="Number of runs" />
                          <FormikControl name="hundreds" type="number" label="Number of hunderds" />
                          <FormikControl name="batting_average" type="number" label="Batting average" />
                          <FormikControl name="wickets" type="number" label="Number of wickets" />
                          <FormikControl name="hattricks" type="number" label="Number of hattricks" />
                          <FormikControl name="bowlingg_average" type="number" label="Bowling average" />
                        </>
                      ) : null}
                    </>
                  );
                } else if (sport === "football") {
                  return (
                    <>
                      {role === "forward" ? (
                        <>
                          <FormikControl name="goals" type="number" label="Number of goals" />
                          <FormikControl name="assists" type="number" label="Number of assists" />
                        </>
                      ) : null}
                      {role === "mid-fielder" ? (
                        <>
                          <FormikControl name="passes" type="number" label="Number of passes" />
                          <FormikControl name="interceptions" type="number" label="Number of interceptions" />
                        </>
                      ) : null}
                      {role === "defender" ? (
                        <>
                          <FormikControl name="goals_saved" type="number" label="Number of goals saved" />
                        </>
                      ) : null}
                    </>
                  );
                } else return <></>;
              }}
            </Field>
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

export function FormikStepper({ children, ...props }) {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values) => {
        props.setFormData({ values });
        if (isLastStep()) {
          await props.onSubmit(values);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Form>
            <Stepper alternativeLabel activeStep={step}>
              {childrenArray.map((child, index) => (
                <Step key={index} completed={step > index || completed}>
                  <StepLabel>{child.props.label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {currentChild}

            <Grid container spacing={2}>
              {step > 0 ? (
                <Grid item>
                  <Button disabled={isSubmitting} variant="contained" color="primary" onClick={() => setStep((s) => s - 1)}>
                    Back
                  </Button>
                </Grid>
              ) : null}
              <Grid item>
                <Button
                  startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {isSubmitting ? "Submitting" : isLastStep() ? "Submit" : "Next"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}

export function FormikStep({ children }) {
  return <>{children}</>;
}
