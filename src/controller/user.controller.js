const userModel = require("../model/user.model"); // Import the user model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const cloudinary = require('../helper/cloudinary'); // Import Cloudinary helper for image upload
const { success, failed } = require('../helper/response'); // Import response helper functions

const userController = {
    // Controller for listing all users
    list: (req, res) => {
        userModel.selectAllUser()
        .then((result) => {
            success(res, result.rows, 'success', 'Get all user success'); // Successful response with all users
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get all user failed'); // Handle error while retrieving all users
        });
    },
    // Controller for listing paged users with optional filtering and sorting
    listPaged: (req, res) => {
        const page = req.params.page;
        const name = req.query.name;
        const sort = req.query.sort;
        const asc = req.query.asc;

        userModel.findUserPaged(name, page, sort, asc)
        .then((result) => {
            success(res, result.rows, 'success', 'Get user success'); // Successful response with paged users
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get user failed'); // Handle error while retrieving paged users
        });
    },
    // Controller for getting detailed information of a user by their ID
    detail: (req, res) => {
        const id = req.params.id;

        userModel.findUser(id)
        .then((result) => {
            success(res, result.rows, 'success', 'Get user detail success'); // Successful response with detailed user
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get user detail failed'); // Handle error while retrieving detailed user
        });
    },
    // Controller for updating user profile
    update: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        const password = body.password ? bcrypt.hashSync(body.password, 10) : null; // Hash the password if provided

        const data = {
            ...body,
            password,
            id
        }

        userModel.updateProfile(data)
        .then((result) => {
            userModel.findUser(id)
            .then((result) => {
                success(res, result.rows, 'success', 'Update user success'); // Successful response after updating user
            })
            .catch((err) => {
                failed(res, err.message, 'failed', 'Get user detail failed'); // Handle error while retrieving updated user
            })
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Update user failed'); // Handle error while updating user
        });
    },
    // Controller for updating user profile picture
    updateImg: async(req, res) => {
        const id = await req.params.id;
        const image = await cloudinary.uploader.upload(req.file.path); // Upload image to Cloudinary

        const data = {
            id,
            image: `${image.secure_url}|&&|${image.public_id}`,
        }

        userModel.updateProfile(data)
        .then((result) => {
            userModel.findUser(id)
            .then((result) => {
                success(res, result.rows, 'success', 'Update user picture success'); // Successful response after updating user picture
            })
            .catch((err) => {
                failed(res, err.message, 'failed', 'Get user detail failed'); // Handle error while retrieving updated user
            })
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Update user picture failed'); // Handle error while updating user picture
        });
    },
    // Controller for deleting a user by their ID
    destroy: (req, res) => {
        const id = req.params.id;

        userModel.deleteUser(id)
        .then((result) => {
            success(res, result.rowCount, 'success', 'Delete user success'); // Successful response after deleting user
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Delete user failed'); // Handle error while deleting user
        });
    },
    // Controller for adding a like to a recipe
    addLike: (req, res) => {
        const body = req.body;

        userModel.insertLike(body)
        .then((result) => {
            success(res, result.rowCount, 'success', 'Insert like success'); // Successful response after adding a like
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Insert like failed'); // Handle error while adding a like
        });
    },
    // Controller for adding a save to a recipe
    addSave: (req, res) => {
        const body = req.body;

        userModel.insertSave(body)
        .then((result) => {
            success(res, result.rowCount, 'success', 'Insert save success'); // Successful response after adding a save
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Insert save failed'); // Handle error while adding a save
        });
    },
    // Controller for removing a like from a recipe
    removeLike: (req, res) => {
        const id = req.params.id;

        userModel.deleteLike(id)
        .then((result) => {
            success(res, result.rowCount, 'success', 'Delete like success'); // Successful response after removing a like
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Delete like failed'); // Handle error while removing a like
        });
    },
    // Controller for removing a save from a recipe
    removeSave: (req, res) => {
        const id = req.params.id;

        userModel.deleteSave(id)
        .then((result) => {
            success(res, result.rowCount, 'success', 'Delete save success'); // Successful response after removing a save
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Delete save failed'); // Handle error while removing a save
        });
    },
}

module.exports = userController; // Export the user controller
