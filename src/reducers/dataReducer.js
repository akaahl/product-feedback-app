const initialState = {
  currentUser: {},
  productRequests: [],
  category: "",
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

    default:
      return { ...state };
  }
};

export default dataReducer;
