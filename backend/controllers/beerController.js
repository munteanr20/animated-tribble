import beerModel from "../models/beerModel.js";
import fs from "fs";

const addBeer = async (req, res) => {

    let image_filename = `${req.file.filename}`;
    const beer = new beerModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    })

    try{
        await beer.save();
        res.json({success: true, message: "Beer added successfully."});
    } catch(error){
        console.log(error)
        res.json({success: false, message: "Failed to add the beer."});
    }
}


const listBeer = async (req, res) => {
    try{
        const beers = await beerModel.find({});
        res.json({succes: true, data: beers});
    } catch(error){
        console.log(error);
        res.json({success: false, message: "Failed to list the beer."});
    }
}

const removeBeer = async (req, res) => {
    try {
        const { beerId } = req.body;
        if (!beerId) return res.status(400).json({ success: false, message: "Missing beerId" });

        const deleted = await beerModel.findByIdAndDelete(beerId);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Beer not found" });
        }

        res.json({ success: true, message: "Beer deleted successfully" });
    } catch (err) {
        console.error("❌ Error deleting beer:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export {addBeer, listBeer, removeBeer};