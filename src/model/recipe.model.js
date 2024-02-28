const db = require("../config/db");

const recipeModel = {
    selectAllRecipes: () => {
        return new Promise((resolve, reject) => {
            db.query(`select *, recipes.id as recipeid, recipes.image as recipeimg from recipes join users on owner = users.id order by title`, (err, res) => {
                if(err){
                    reject(err);
                }
                resolve(res);
            })
        })
    },

    listOwnedRecipes: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`select recipes.* from recipes join users on owner = users.id where owner = ${id}`, (err, res) => {
                if(err){
                    reject(err);
                }
                resolve(res);
            })
        })
    },

    listLikedRecipes: (id) => {
        return new Promise((resolve, reject) => {
            db.query(` 
                select recipes.* from likes
                join recipes on likes.recipes = recipes.id
                join users on likes.users = users.id
                where likes.users = ${id}
            `, (err, res) => {
                if(err){
                    reject(err);
                }
                resolve(res);
            })
        })
    },

    listSavedRecipes: (id) => {
        return new Promise((resolve, reject) => {
            db.query(` 
                select recipes.* from saved
                join recipes on saved.recipes = recipes.id
                join users on saved.users = users.id
                where saved.users = ${id}
            `, (err, res) => {
                if(err){
                    reject(err);
                }
                resolve(res);
            })
        })
    },

    findRecipesPaged: (title, page, sort, asc) => {
        return new Promise((resolve, reject) => {
            const limit = 2;
            const offset = (page - 1) * limit;

            if(asc.toLowerCase() !== 'desc') asc = 'asc';
            if(sort.toLowerCase() !== 'id') sort = 'title';

            db.query(`select *, recipes.id as recipeid, recipes.image as recipeimg from recipes join users on owner = users.id where title ilike '%${title}%' order by recipes.${sort} ${asc} limit ${limit} offset ${offset}`, (err, res) => {
                if(err){
                    reject(err);
                }
                resolve(res);
            })
        })
    },

    findRecipe: (title) => {
        return new Promise((resolve, reject) => {
            db.query(`select *, recipes.id as recipeid, recipes.image as recipeimg from recipes join users on owner = users.id where title ilike '%${title}%';`, (err, res) => {
                if(err){
                    reject(err);
                }
                resolve(res);
            })
        })
    },

    recipeDetail: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`select *, recipes.id as recipeid, recipes.image as recipeimg from recipes join users on owner = users.id where recipes.id = ${id};`, (err, res) => {
                if(err){
                    reject(err);
                }
                resolve(res);
            })
        })
    },

    insertRecipe: ({title, ingredient, image, owner}) => {
        return new Promise((resolve, reject) => {
            const date = new Date();
            const yyyy = date.getFullYear();
            let mm = date.getMonth() + 1;
            let dd = date.getDate();

            if (dd< 10) dd = '0' + dd;
            if (mm< 10) mm = '0' + mm;

            const date_created = `${yyyy}-${mm}-${dd}`;
            db.query(`insert into recipes (title, ingredient, owner, date_created, image) values ('${title}', '${ingredient}', ${owner}, '${date_created}', '${image}');`, (err, res) => {
                if(err){
                    reject(err);
                }
                resolve(res);
            })
        })
    },

    updateRecipe: ({id, title, ingredient, image}) => {
        return new Promise((resolve, reject) => {
            db.query(`
                update recipes set
                title = coalesce ($2, title),
                ingredient = coalesce ($3, ingredient),
                image = coalesce ($4, image)
                where id = $1
            `, [id, title, ingredient, image],
            (err, res) => {
                if(err){
                    reject(err);
                }
                resolve(res);
            })
        })
    },

    deleteRecipe: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`delete from recipes where id = ${id}`, (err, res) => {
                if(err){
                    reject(err);
                }
                resolve(res);
            })
        })
    },
}

module.exports = recipeModel;