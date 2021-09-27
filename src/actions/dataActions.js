const dbUrl = "data.json";

export const fetchData = () => async (dispatch) => {
  const res = await fetch(dbUrl);
  const data = await res.json();

  localStorage.setItem("data", JSON.stringify(data));

  dispatch({
    type: "FETCH_DATA",
    payload: {
      currentUser: data.currentUser,
      productRequests: data.productRequests,
    },
  });
};

export const filterCategory = (category) => async (dispatch) => {
  const data = JSON.parse(localStorage.getItem("data"));

  dispatch({
    type: "FILTER_DATA",
    payload: {
      currentUser: data.currentUser,
      productRequests: data.productRequests,
      category,
    },
  });
};

export const updateData = (data) => async (dispatch) => {
  dispatch({
    type: "UPDATE_DATA",
    payload: {
      currentUser: data.currentUser,
      productRequests: data.productRequests,
    },
  });
};

export const setButtonActive = (id) => async (dispatch) => {
  dispatch({
    type: "SET_BUTTON_ACTIVE",
    payload: {
      id,
    },
  });
};
