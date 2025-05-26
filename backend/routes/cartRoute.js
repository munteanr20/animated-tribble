import express from  "express"
import {addToCart, removeFromCart, getCart} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js"

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware,addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.get("/get", authMiddleware, getCart);

export default cartRouter;

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add an item to the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemId
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: ID of the beer to add
 *     responses:
 *       200:
 *         description: Item added to cart
 *       400:
 *         description: Missing or invalid itemId
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/cart/remove:
 *   post:
 *     summary: Remove one unit of an item from the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemId
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: ID of the beer to remove
 *     responses:
 *       200:
 *         description: Item removed from cart
 *       400:
 *         description: Missing or invalid itemId
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/cart/get:
 *   get:
 *     summary: Get the current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns cart data
 *       401:
 *         description: Unauthorized
 */

