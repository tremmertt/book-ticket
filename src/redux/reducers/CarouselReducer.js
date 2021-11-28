import { SET_CAROUSEL } from "../actions/type/CarouselType";

const stateDefault = {
  arrImg: [
    {
      idBanner: 1,
      idFilm: 1282,
      image: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
    },
  ],
};

export const CarouselReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_CAROUSEL: {
      state.arrImg = action.arrImg;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
