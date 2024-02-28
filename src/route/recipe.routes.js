//declare express
const express = require("express");
const { list, detail, insert, update, destroy, listPaged, listComment, deleteImg, updateImg, find, listOwned, listLiked, listSaved } = require("../controller/recipe.controller");

const router = express.Router();

const jwtAuth = require('../middleware/jwtAuth');
const { isAdmin, isCustomer } = require('../middleware/authorization');
const uploadRP = require('../middleware/uploadRecipePic');
const deleteRecipeImg = require('../middleware/deleteRecipesPic');

router
.get("/recipes", list)
.get("/recipes/:page", listPaged)
.get("/recipe/:id", detail)
.get("/recipe/owned/:id", listOwned)
.get("/recipe/liked/:id", listLiked)
.get("/recipe/saved/:id", listSaved)
.post("/recipe/find", find)
.post("/recipe/insert", uploadRP, insert)
.put("/recipe/:id", update)
.put("/recipe/changeimg/:id", uploadRP, deleteRecipeImg, updateImg)
.delete("/recipe/:id", deleteRecipeImg, destroy);

module.exports = router;