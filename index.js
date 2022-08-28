const express = require('express');
const app =  express();

//Database
const Employees = require('./db/employeeDb');

//router
const router = require('./routes/employees');

//enviroment vars
require("dotenv").config();

const PORT = process.env.PORT

//middleware
app.use(express.json());
app.use('/', router);
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));

//Set Views
app.set('view engine', 'ejs');

Employees.connect((err) => {
    if(err) {throw err 
    } else {

        app.listen(PORT, () => {
            console.log(`Listening on Port ${PORT}`);
        })
    }
})


