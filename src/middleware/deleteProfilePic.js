const cloudinary = require("../helper/cloudinary");
const userModel = require("../model/user.model");

const removeProfileImg = async (req, res, next) => {
  const id = req.params.id;
  const data = await userModel.findUser(id);
  if (data.rows[0]) {
    const img = data.rows[0].image;
    if(img.split('|&&|')[0] !== "https://res.cloudinary.com/dmkviiqax/image/upload/v1670737726/default_frc_pr_f6t9gz.png"){
      await cloudinary.uploader.destroy(img.split('|&&|')[1])
    }
    next();
  } else {
    res.json("User not found");
  }
};

module.exports = removeProfileImg;