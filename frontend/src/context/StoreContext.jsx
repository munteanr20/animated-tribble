import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; // asigură-te că e importat

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000"
    const [token,setToken] = useState("")
    const [beer_list,setFoodList] = useState([])

    const fetchUserDetailsById = async (userId) => {
        try {
            const response = await axios.get(`${url}/api/user/${userId}`);
            if (response.data.success) {
                setUserDetails(response.data.data);
            } else {
                setUserDetails(null);
            }
        } catch (err) {
            console.error("❌ Failed to fetch user details:", err.message);
            setUserDetails(null);
        }
    };



    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems)
        {
            if (cartItems[item] > 0) {
                let itemInfo = beer_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchBeerList = async () => {
        const response = await axios.get(url+"/api/beer/list");
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        try {
            const response = await axios.get(url + "/api/cart/get", { headers: { token } });
            const cartData = response.data?.cartData ?? {};
            console.log("🛒 Coș încărcat din server:", cartData);
            setCartItems(cartData);
        } catch (err) {
            console.error("❌ Eroare la încărcarea coșului:", err.message);
            setCartItems({});
        }
    };



    useEffect(() => {
        async function loadData() {
            await fetchBeerList();

            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken); // încarcă din server
            } else {
                const savedCart = localStorage.getItem("cartItems");
                if (savedCart) {
                    setCartItems(JSON.parse(savedCart)); // încarcă din localStorage
                }
            }
        }

        loadData();
    }, []);

    useEffect(() => {
        if (token && token.split(".").length === 3) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
                fetchUserDetailsById(decoded.id); // 👈 încarcă datele complete
            } catch (err) {
                console.error("❌ Invalid token:", err.message);
                setUser(null);
                setUserDetails(null);
            }
        } else {
            setUser(null);
            setUserDetails(null);
        }
    }, [token]);


    const contextValue = {
        beer_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        userDetails,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;