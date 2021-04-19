export const SAVE_DATA = "SAVE_DATA";

export const saveData = ({ data }) => (dispatch) => {
  dispatch({
    type: SAVE_DATA,
    payload: data
  });
};
