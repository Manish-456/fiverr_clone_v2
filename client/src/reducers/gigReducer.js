import getCurrentUser from "../utils/getCurrentUser";

const currentUser = getCurrentUser();
export const INITIAL_STATE = {
  user: currentUser?._id,
  title: "",
  category: "",
  cover: "",
  images: [],
  desc: "",
  shortTitle: "",
  shortDesc: "",
  deliveryTime: 0,
  revisionTime: 0,
  features: [],
  price: 0,
};

export const gigReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "Add_IMAGES":
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };
    case "ADD_FEATURES":
      return {
        ...state,
        features: [...state.features, action.payload],
      };
    case "REMOVE_FEATURES":
      return {
        ...state,
        features: state.features.filter(
          (feature) => feature !== action.payload
        ),
      };
    default:
      return state;
  }
};


