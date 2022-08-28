require("dotenv").config();

const mysql = require('mysql');



const Employees = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});





module.exports = Employees;