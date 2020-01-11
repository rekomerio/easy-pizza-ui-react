const emptyState = {
    ids: [],
    items: {},
    price: 0,
    restaurantId: -1,
    discount: 0.0,
    discountCode: null
};

export default (state = emptyState, action) => {
    switch (action.type) {
        case "ADD_ITEM": {
            const { item, restaurantId } = action.payload;
            const itemIsInCart = state.ids.findIndex(id => id === item.id) !== -1;
            const newPrice = state.price + item.price;
            // Item already exists, so just modify the quantity of it
            if (itemIsInCart) {
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [item.id]: {
                            ...state.items[item.id],
                            quantity: state.items[item.id].quantity + 1
                        }
                    },
                    price: newPrice
                };
            } else {
                if (state.restaurantId !== restaurantId && state.restaurantId !== -1) {
                    console.log("Cant mix restaurants", state.restaurantId, restaurantId);
                    return state;
                }
                item.quantity = 1;
                return {
                    ...state,
                    ids: [...state.ids, item.id],
                    items: {
                        ...state.items,
                        [item.id]: item
                    },
                    price: newPrice,
                    restaurantId
                };
            }
        }

        case "REMOVE_ITEM": {
            const { item } = action.payload;
            const newPrice = state.price - item.price;
            const newState = { ...state };
            const shouldDelete = newState.items[item.id].quantity <= 1;

            return {
                ...state,
                ids: shouldDelete ? state.ids.filter(id => id !== item.id) : state.ids,
                items: {
                    ...state.items,
                    [item.id]: {
                        ...state.items[item.id],
                        quantity: state.items[item.id].quantity - 1
                    }
                },
                price: newPrice,
                restaurantId: newPrice !== 0 ? state.restaurantId : -1
            };
        }
        default:
            return state;
    }
};
