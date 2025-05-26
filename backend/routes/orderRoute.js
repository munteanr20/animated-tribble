import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, getUserOrders, getAllOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.get("/user", authMiddleware, getUserOrders);
router.get("/getAll", getAllOrders);

export default router;

/**
 * @swagger
 * /api/order/getAll:
 *   get:
 *     summary: Get all orders (admin)
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Returns all orders
 */
/**
 * @swagger
 * /api/order/user:
 *   get:
 *     summary: Get orders for the authenticated user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of user's orders
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/order/place:
 *   post:
 *     summary: Place a new order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - amount
 *               - address
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     category:
 *                       type: string
 *               amount:
 *                 type: number
 *               address:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   address:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   zip:
 *                     type: string
 *     responses:
 *       200:
 *         description: Order placed successfully
 *       400:
 *         description: Invalid order data
 *       401:
 *         description: Unauthorized
 */




