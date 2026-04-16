const CART_KEY = "cart";
const COLLECTION_KEY = "collection";

// 🛒 КОРЗИНА
export const getCart = () => {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
};

export const addToCart = (item: any) => {
  const cart = getCart();

  const exists = cart.some((i: any) => i.id === item.id);

  if (!exists) {
    localStorage.setItem(CART_KEY, JSON.stringify([...cart, item]));
  }
};

// 📚 КОЛЛЕКЦИЯ
export const getCollection = () => {
  return JSON.parse(localStorage.getItem(COLLECTION_KEY) || "[]");
};

export const addToCollection = (item: any) => {
  const collection = getCollection();

  const exists = collection.some((i: any) => i.id === item.id);

  if (!exists) {
    localStorage.setItem(
      COLLECTION_KEY,
      JSON.stringify([...collection, item])
    );
  }
};