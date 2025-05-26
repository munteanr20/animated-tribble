import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        const newOrder = new orderModel({
            userId: userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();

        // Golește coșul după plasarea comenzii
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        console.log("✅ Comandă salvată pentru user:", userId);
        res.json({ success: true, message: "Comandă plasată cu succes." });

    } catch (error) {
        console.error("❌ Eroare la plasare comandă:", error);
        res.status(500).json({ success: false, message: "Eroare la salvarea comenzii." });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.error("❌ Eroare la preluarea comenzilor:", error);
        res.status(500).json({ success: false, message: "Eroare la preluarea comenzilor." });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (err) {
        console.error("❌ Error fetching all orders:", err.message);
        res.status(500).json({ success: false, message: "Server error fetching orders." });
    }
};


export { placeOrder, getUserOrders, getAllOrders };
