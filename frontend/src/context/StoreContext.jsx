import {createContext, useEffect, useState} from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000"
  const [token, setToken] = useState("");

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems({});
  };

  /**
   * Calculează totalul în funcție de datele reale din backend
   * @param {Array} beerList - lista berilor din backend
   */
  const getTotalCartAmount = (beerList = []) => {
    let total = 0;
    for (const id in cartItems) {
      const item = beerList.find((b) => String(b._id) === String(id));
      if (item) {
        total += item.price * cartItems[id];
      }
    }
    return total;
  };

  useEffect(() => {
      if(localStorage.getItem("token")) {
          setToken(localStorage.getItem("token"));
      }
  }, [])

  return (
      <StoreContext.Provider
          value={{
            cartItems,
            setCartItems,
            addToCart,
            removeFromCart,
            getTotalCartAmount,
            clearCart,
            url,
              token,
              setToken,
          }}
      >
        {children}
      </StoreContext.Provider>
  );
};

export default StoreContextProvider;
