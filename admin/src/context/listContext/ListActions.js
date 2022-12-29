export const getListsStart = () => ({
  type: "GET_LISTS_START",
});
export const getListsSuccess = (lists) => ({
  type: "GET_LISTS_SUCCESS",
  payload: lists,
});
export const getListsFailure = () => ({
  type: "GET_LISTS_FAILURE",
});

//create movie
export const createListsStart = () => ({
  type: "CREATE_LISTS_START",
});
export const createListsSuccess = (list) => ({
  type: "CREATE_LISTS_SUCCESS",
  payload: list,
});
export const createListsFailure = () => ({
  type: "CREATE_LISTS_FAILURE",
});

// //update
// export const updateMovieStart = () => ({
//   type: "UPDATE_MOVIE_START",
// });
// export const updateMovieSuccess = (movie) => ({
//   type: "UPDATE_MOVIE_SUCCESS",
//   payload: movie,
// });
// export const updateMovieFailure = () => ({
//   type: "UPDATE_MOVIE_FAILURE",
// });

//delete
export const deleteListStart = () => ({
  type: "DELETE_LISTS_START",
});
export const deleteListSuccess = (id) => ({
  type: "DELETE_LISTS_SUCCESS",
  payload: id,
});
export const deleteListFailure = () => ({
  type: "DELETE_LISTS_FAILURE",
});
