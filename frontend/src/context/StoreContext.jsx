import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
    const [beerList, setBeerList] = useState([]);
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState(""); // adaugăm ID-ul utilizatorului

    // 🛒 Adaugă în coș (local sau din backend)
    const addToCart = async (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev, [itemId]:1}))
        }else{
            setCartItems((prev) => ({...prev, [itemId]:prev[itemId] + 1}))

        }
        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`, {itemId}, {headers: {token}});
                // await getCartFromServer(); //
            } catch (err) {
                console.error("Error adding to cart", err);
            }
        }
    };

    // ❌ Elimină din coș (local sau din backend)
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}))
        if (token) {
            try {
                await axios.post(`${url}/api/cart/remove`, {itemId}, {headers: {token}});
            } catch (err) {
                console.error("Error removing from cart", err);
            }
        }
    };

    const clearCart = () => {
        setCartItems({});
    };

    const fetchBeerList = async () =>{
        const response = await axios.get(`${url}/api/beer/list`);
        setBeerList(response.data.data);
    }

    const loadCartData = async (token) =>{
        const response = await axios.post(`${url}/api/cart/get`, {}, {headers: {token}})
        setCartItems(response.data.cartData);
    }

    // 💰 Total pe baza unei liste externe (ex: produse din DB)
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
        async function loadData() {
            await fetchBeerList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
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
                userId,
                setUserId,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
