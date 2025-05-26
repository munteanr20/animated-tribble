import express from "express";
import {addBeer, listBeer, removeBeer} from "../controllers/beerController.js";
import multer from "multer";

const beerRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
})

const upload = multer({storage: storage});
beerRouter.post("/add", upload.single("image"), addBeer);
beerRouter.get("/list", listBeer);
beerRouter.post("/remove", removeBeer);

export default beerRouter;

/**
 * @swagger
 * /api/beer/list:
 *   get:
 *     summary: Retrieve all beers
 *     tags: [Beer]
 *     responses:
 *       200:
 *         description: A list of beers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */

/**
 * @swagger
 * /api/beer/add:
 *   post:
 *     summary: Add a new beer
 *     tags: [Beer]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Beer added successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/beer/remove:
 *   post:
 *     summary: Remove a beer by ID
 *     tags: [Beer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - beerId
 *             properties:
 *               beerId:
 *                 type: string
 *                 description: The ID of the beer to delete
 *     responses:
 *       200:
 *         description: Beer removed successfully
 *       400:
 *         description: Missing beerId
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Beer not found
 */

