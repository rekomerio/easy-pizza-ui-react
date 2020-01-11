export const shoppingCartState = store => store.shoppingCart;

export const getShoppingCartItemById = (store, id) =>
    shoppingCartState(store) ? shoppingCartState(store).items[id] : {};

export const getShoppingCartIds = store =>
    shoppingCartState(store) ? shoppingCartState(store).ids : [];

export const getShoppingCartItems = store =>
    shoppingCartState(store)
        ? shoppingCartState(store).ids.map(id => getShoppingCartItemById(store, id))
        : [];

export const getShoppingCartPrice = store =>
    shoppingCartState(store) ? shoppingCartState(store).price : null;
