const shelfReducer = (state = [], action) => {
  if (action.type === 'SET_SHELF') {
    return action.payload;
  } else {
    return state;
  }
};

export default shelf;
