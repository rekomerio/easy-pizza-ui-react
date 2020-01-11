export default (state = { ids: [], items: {}, price: 0 }, action) => {
    switch (action.type) {
        case "ADD_ITEM": {
            const { item } = action.payload;
            const index = state.ids.findIndex(id => id === item.id);
            const newPrice = state.price + item.price;
            // Item already exists, so just modify the quantity of it
            if (index !== -1) {
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
                item.quantity = 1;
                return {
                    ids: [...state.ids, item.id],
                    items: {
                        ...state.items,
                        [item.id]: item
                    },
                    price: newPrice
                };
            }
        }

        case "REMOVE_ITEM": {
            const { item } = action.payload;
            const newPrice = state.price - item.price;
            const newState = { ...state };
            const shouldDelete = newState.items[item.id].quantity <= 1;

            return {
                ids: shouldDelete ? state.ids.filter(id => id !== item.id) : state.ids,
                items: {
                    ...state.items,
                    [item.id]: {
                        ...state.items[item.id],
                        quantity: state.items[item.id].quantity - 1
                    }
                },
                price: newPrice
            };
        }
        default:
            return state;
    }
};
