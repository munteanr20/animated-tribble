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