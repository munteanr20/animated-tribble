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

export {addBeer};