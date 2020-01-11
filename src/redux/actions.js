export const setLoading = isLoading => ({
    type: "SET_LOADING",
    payload: { isLoading }
});

export const addCartItem = item => ({
    type: "ADD_ITEM",
    payload: { item }
});

export const removeCartItem = item => ({
    type: "REMOVE_ITEM",
    payload: { item }
});
