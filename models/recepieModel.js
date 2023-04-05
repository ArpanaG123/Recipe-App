const mongoose = require('mongoose')

const recepieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'title is required']
    },
    ingredients:{
        type:String,
        required:[true,'ingredients is required']
    },
    image:{
        type:String,
        required:[true,'image is required']
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"Users",
        required:[true,'user id is required']

    },

},{timestamps:true})

const recepieModel = mongoose.model('recepies',recepieSchema)

module.exports = recepieModel;