const express = require('express')
const { getAllRecepieController,createRecepieController,updateRecepieController,getSingleRecepieController, deleteRecepieController,userRecepieController} = require('../controllers/recepieController')

//router object
const router = express.Router()

//recepie-blog||GET||R
router.get("/all-recepie",getAllRecepieController)

//CREATE RECEPIE-BLOG||POST||C
router.post("/create-recepie",createRecepieController)


//UPDATE RECEPIE-BLOG||PUT||U
router.put("/update-recepie/:id",updateRecepieController)

//Get single-recepie-blog
router.get("/get-recepie/:id",getSingleRecepieController)


//DELETE RECEPIE-BLOG||DELETE||D
router.delete("/delete-recepie/:id",deleteRecepieController)

//GET-User recepie
router.get("/user-recepie/:id",userRecepieController);


module.exports = router;
