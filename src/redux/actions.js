export const setLoading = isLoading => ({
    type: "SET_LOADING",
    payload: { isLoading }
});

export const addCartItem = (item, restaurantId) => ({
    type: "ADD_ITEM",
    payload: { item, restaurantId }
});

export const removeCartItem = item => ({
    type: "REMOVE_ITEM",
    payload: { item }
});
