import mongoose from "mongoose";

const beerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    category: {type: String, required: true}
})

const beerModel = mongoose.models.beer || mongoose.model("Beer", beerSchema);

export default beerModel;