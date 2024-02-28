const express = require("express");
const { list, detail, update, destroy, listPaged, deleteImg, updateImg, addLike, addSave, removeLike, removeSave } = require("../controller/user.controller");
const { register, login, checkEmail } = require('../controller/auth.controller');

const router = express.Router();

const jwtAuth = require('../middleware/jwtAuth');
const { isAdmin } = require('../middleware/authorization');
const uploadPP = require('../middleware/uploadProfilePic');
const deleteProfileImg = require('../middleware/deleteProfilePic');

router
.get("/users", list)
.get("/user/:page", listPaged)
.get("/user/detail/:id", detail)
.put("/user/:id", update)
.put("/user/changeimg/:id", uploadPP, deleteProfileImg, updateImg)
.delete("/user/:id", deleteProfileImg, destroy)
.get("/email/:email", checkEmail)
.post('/user/register', register)
.post('/user/login', login)
.post('/like', addLike)
.post('/save', addSave)
.delete('/like/:id', removeLike)
.delete('/save/:id', removeSave)

module.exports = router;