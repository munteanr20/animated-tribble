import userModel from "../models/userModel.js";

//add items to user cart

const addToCart = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.user.id;
        let userData = await userModel.findById(userId);


        // Asigură-te că are un cartData inițializat
        if (!userData.cartData) {
            userData.cartData = {};
        }

        // Adaugă produsul sau incrementează cantitatea
        if (!userData.cartData[itemId]) {
            userData.cartData[itemId] = 1;
        } else {
            userData.cartData[itemId] += 1;
        }

        // Salvează modificările
        await userModel.findByIdAndUpdate(userId, { cartData: userData.cartData });

        res.json({ success: true, message: "Item added to cart" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// remove items from user cart

// ✅ Elimină item din coș
const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.body;
        const userId = req.user.id;

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!userData.cartData || !userData.cartData[itemId]) {
            return res.status(400).json({ success: false, message: "Item not found in cart" });
        }

        if (userData.cartData[itemId] === 1) {
            delete userData.cartData[itemId]; // șterge complet
        } else {
            userData.cartData[itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData: userData.cartData });

        res.json({ success: true, message: "Item removed from cart" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Asigură-te că este obiect, nu altceva
        if (typeof userData.cartData !== "object") {
            return res.status(500).json({ success: false, message: "cartData invalid" });
        }

        res.json({ success: true, cartData: userData.cartData || {} });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export { addToCart, removeFromCart, getCart };
