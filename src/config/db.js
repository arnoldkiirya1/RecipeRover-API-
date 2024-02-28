//postgresql

//declare library
const pg = require("pg");
const { db_database, db_localhost, db_username, db_password, db_port } = require('../helper/env')

try{
    const db = new pg.Pool({
        host: db_localhost,
        user: db_username,
        password: db_password,
        database: db_database,
        port : db_port
    });

    //Connect to Database
    db.connect((err) => {
        if(err){
            throw "Cannot connect to Database";
        }
    });

    module.exports = db;
}catch(err){
    console.log(err);
}
