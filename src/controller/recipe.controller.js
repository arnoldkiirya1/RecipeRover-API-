const recipeModel = require("../model/recipe.model"); // Import the recipe model
const cloudinary = require('../helper/cloudinary'); // Import Cloudinary helper for image upload
const { success, failed } = require('../helper/response'); // Import response helper functions

const recipeController = {
    // Controller for listing all recipes
    list: (req, res) => {
        recipeModel.selectAllRecipes()
        .then((result) => {
            success(res, result.rows, 'success', 'Get all recipes success'); // Successful response with all recipes
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get all recipes failed'); // Handle error while retrieving all recipes
        });
    },
    // Controller for listing paged recipes with optional filtering and sorting
    listPaged: (req, res) => {
        const page = req.params.page;
        const title = req.query.title;
        const sort = req.query.sort;
        const asc = req.query.asc;

        recipeModel.findRecipesPaged(title, page, sort, asc)
        .then((result) => {
            success(res, result.rows, 'success', 'Get recipes success'); // Successful response with paged recipes
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get recipes failed'); // Handle error while retrieving paged recipes
        });
    },
    // Controller for finding recipes by title
    find: (req, res) => {
        const { title } = req.body;

        recipeModel.findRecipe(title)
        .then((result) => {
            success(res, result.rows, 'success', 'Find recipe success'); // Successful response with found recipe(s)
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Find recipe failed'); // Handle error while finding recipe(s)
        });
    },
    // Controller for getting detailed information of a recipe by its ID
    detail: (req, res) => {
        const id = req.params.id;

        recipeModel.recipeDetail(id)
        .then((result) => {
            success(res, result.rows, 'success', 'Get detailed recipe success'); // Successful response with detailed recipe
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get detailed recipe failed'); // Handle error while retrieving detailed recipe
        });
    },
    // Controller for listing recipes owned by a user
    listOwned: (req, res) => {
        const id = req.params.id;

        recipeModel.listOwnedRecipes(id)
        .then((result) => {
            success(res, result.rows, 'success', 'Get recipe owned list success'); // Successful response with owned recipes
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get recipe owned list failed'); // Handle error while retrieving owned recipes
        });
    },
    // Controller for listing recipes liked by a user
    listLiked: (req, res) => {
        const id = req.params.id;

        recipeModel.listLikedRecipes(id)
        .then((result) => {
            success(res, result.rows, 'success', 'Get recipe liked list success'); // Successful response with liked recipes
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get recipe liked list failed'); // Handle error while retrieving liked recipes
        });
    },
    // Controller for listing recipes saved by a user
    listSaved: (req, res) => {
        const id = req.params.id;

        recipeModel.listSavedRecipes(id)
        .then((result) => {
            success(res, result.rows, 'success', 'Get recipe saved list success'); // Successful response with saved recipes
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Get recipe saved list failed'); // Handle error while retrieving saved recipes
        });
    },
    // Controller for inserting a new recipe
    insert: async (req, res) => {
        try {
            const { title, ingredient, owner } = await req.body;
            const image = req.file ? await cloudinary.uploader.upload(req.file.path) : { secure_url: "https://res.cloudinary.com/dmkviiqax/image/upload/v1670740075/null_jxiqhn.jpg", public_id: "" };

            const data = {
                title,
                ingredient,
                owner,
                image: `${image.secure_url}|&&|${image.public_id}`,
            }

            recipeModel.insertRecipe(data)
            .then((result) => {
                success(res, result.rowCount, 'success', 'Insert Success'); // Successful response after inserting a new recipe
            }).catch((err) => {
                failed(res, err.message, 'failed', 'Insert failed'); // Handle error while inserting new recipe
            })
        } catch (err) {
            failed(res, err.message, 'failed', 'Internal Server Error'); // Handle internal server error
        }
    },
    // Controller for updating an existing recipe
    update: (req, res) => {
        const id = req.params.id;
        const { title, ingredient } = req.body;

        const data = {
            id,
            title,
            ingredient
        };

        recipeModel.updateRecipe(data)
        .then((result) => {
            recipeModel.recipeDetail(id)
            .then((result) => {
                success(res, result.rows, 'success', 'Update recipe success'); // Successful response after updating recipe
            })
            .catch((err) => {
                failed(res, err.message, 'failed', 'Get detailed recipe failed'); // Handle error while retrieving detailed recipe
            });
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Update recipe failed'); // Handle error while updating recipe
        });
    },
    // Controller for updating the image of an existing recipe
    updateImg: async (req, res) => {
        const id = req.params.id;
        const image = await cloudinary.uploader.upload(req.file.path);

        const data = {
            id,
            image: `${image.secure_url}|&&|${image.public_id}`,
        };

        recipeModel.updateRecipe(data)
        .then((result) => {
            recipeModel.recipeDetail(id)
            .then((result) => {
                success(res, result.rows, 'success', 'Update recipe image success'); // Successful response after updating recipe image
            })
            .catch((err) => {
                failed(res, err.message, 'failed', 'Get detailed recipe failed'); // Handle error while retrieving detailed recipe
            });
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Update recipe image failed'); // Handle error while updating recipe image
        });
    },
    // Controller for deleting an existing recipe
    destroy: (req, res) => {
        const id = req.params.id;
        recipeModel.deleteRecipe(id)
        .then((result) => {
            success(res, result.rowCount, 'success', 'Delete recipe success'); // Successful response after deleting recipe
        })
        .catch((err) => {
            failed(res, err.message, 'failed', 'Delete recipe failed'); // Handle error while deleting recipe
        });
    },
}

module.exports = recipeController; // Export the recipe controller
