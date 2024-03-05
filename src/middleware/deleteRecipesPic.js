// Remove Recipe
const cloudinary = require("../helper/cloudinary");
const recipeModel = require("../model/recipe.model");

const removeRecipeImg = async (req, res, next) => {
  const id = req.params.id;
  const data = await recipeModel.recipeDetail(id);
  if (data.rows[0]) {
    const img = data.rows[0].recipeimg;
    if(img.split('|&&|')[0] !== "https://res.cloudinary.com/dmkviiqax/image/upload/v1670740075/null_jxiqhn.jpg"){
      await cloudinary.uploader.destroy(img.split('|&&|')[1])
    }
    next();
  } else {
    res.json('Recipe not found');
  }
};

module.exports = removeRecipeImg;
