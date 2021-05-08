const mysql = require('mysql2');
const fs = require('fs');
var pool;

function createPool(){
    if(!pool){
        try{
            pool = mysql.createPool({
                connectionLimit:10,
                host: "localhost",
                user: "root",
                password: "This is my password",
                database: 'HBA'
            });
        }catch(error){
            console.log('(-) Error in connecting to the database')
            fs.appendFile('./log/error.log',error,(error)=>{
                if(error) throw error;
            });
        }
    }

    return pool;
}

module.exports = createPool();