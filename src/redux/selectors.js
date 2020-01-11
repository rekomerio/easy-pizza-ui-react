export const getShoppingCartState = store => store.shoppingCart;

export const getShoppingCartItemById = (store, id) =>
    getShoppingCartState(store) ? getShoppingCartState(store).items[id] : {};

export const getShoppingCartIds = store =>
    getShoppingCartState(store) ? getShoppingCartState(store).ids : [];

export const getShoppingCartItems = store =>
    getShoppingCartState(store)
        ? getShoppingCartState(store).ids.map(id => getShoppingCartItemById(store, id))
        : [];

export const getShoppingCartPrice = store =>
    getShoppingCartState(store) ? getShoppingCartState(store).price : null;
