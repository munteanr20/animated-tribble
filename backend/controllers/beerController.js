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
    try{
        const beer = await beerModel.findById(req.body.id);
        fs.unlink('uploads/${beer.image}', () => {})
        await beerModel.findByIdAndDelete(req.body.id);
        res.json({succes: true, message: "Beer removed successfully."});
    }catch(error){
        console.log(error);
        res.json({success: false, message: "Failed to remove the beer."});
    }
}
export {addBeer, listBeer, removeBeer};