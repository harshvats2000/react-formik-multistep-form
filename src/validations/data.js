import * as Yup from "yup";

export const validationSchema1 = Yup.object({
  // firstName: Yup.string().required("Required"),
  // lastName: Yup.string().required("Required"),
  // email: Yup.string().email("Invalid Email format.").required("Required"),
  // psw: Yup.string().required("Required"),
  // country: Yup.string().required("Required"),
  sport: Yup.string().required("Required")
});
export const validationSchema2 = Yup.object({
  role: Yup.string().required("Role is Required"),
  bowling_style: Yup.array().when(["role"], {
    is: (role) => role === "bowler" || role === "all-rounder",
    then: Yup.array().min(1, "Select atleast one bowling style.")
  }),
  batting_style: Yup.array().when(["role"], {
    is: (role) => role === "batsmen" || role === "wicket-keeper" || role === "all-rounder",
    then: Yup.array().min(1, "Select atleast one batting style.")
  }),
  defender_style: Yup.string().when(["role"], {
    is: (role) => role === "defender",
    then: Yup.string().required("Select one defending style.")
  }),
  midfielder_style: Yup.string().when(["role"], {
    is: (role) => role === "mid-fielder",
    then: Yup.string().required("Select one mid-fielding style.")
  }),
  forward_style: Yup.string().when(["role"], {
    is: (role) => role === "forward",
    then: Yup.string().required("Select one forward style.")
  })
});
export const validationSchema3 = Yup.object({
  profile: Yup.string().test("len", "Profile must be greater than 20 characters", (val) => val?.length >= 20)
});
