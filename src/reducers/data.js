import { SAVE_DATA } from "../actions";

const initialState = {
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

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SAVE_DATA:
      console.log(Object.assign({}, state, payload));
      return Object.assign({}, state, payload);
    default:
      return state;
  }
}
