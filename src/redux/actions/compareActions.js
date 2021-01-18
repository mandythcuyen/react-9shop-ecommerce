export const ADD_TO_COMPARE = "ADD_TO_COMPARE";
export const DELETE_FROM_COMPARE = "DELETE_FROM_COMPARE";

// add to compare
export const addToCompare = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Đã thêm vào danh sách so sánh!", {
        appearance: "success",
        autoDismiss: true,
      });
    }
    dispatch({ type: ADD_TO_COMPARE, payload: item });
  };
};

// remove from compare
export const removeFromCompare = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Đã xóa khỏi danh sách so sánh!", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    dispatch({ type: DELETE_FROM_COMPARE, payload: item });
  };
};
