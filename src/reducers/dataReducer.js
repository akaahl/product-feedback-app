const storagedata = JSON.parse(localStorage.getItem("data"));

const initialState = {
  currentUser: storagedata.currentUser || {},
  productRequests: storagedata.productRequests || [],
  category: "",
  buttonActive: 1,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        currentUser: action.payload.currentUser,
        productRequests: action.payload.productRequests,
      };

    case "FILTER_DATA":
      return {
        ...state,
        currentUser: action.payload.currentUser,
        productRequests: action.payload.productRequests,
        category: action.payload.category,
      };

    case "UPDATE_DATA":
      return {
        ...state,
        currentUser: action.payload.currentUser,
        productRequests: action.payload.productRequests,
      };

    case "SET_BUTTON_ACTIVE":
      return {
        ...state,
        buttonActive: action.payload.id,
      };

    default:
      return { ...state };
  }
};

export default dataReducer;
