const Employees = require("../db/employeeDb")

function createEmployee(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const department = req.body.department;
    const location = req.body.location;

    Employees.query("INSERT INTO employees (name, email, department, location) VALUES (?, ?, ?, ?)", [name, email, department, location], (err, result) => {
        if(err){
            res.send(err)
        } else {
            res.status(201).json(name);
        }
    } )
   
}



module.exports = createEmployee