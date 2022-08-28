const Employees = require("../db/employeeDb");

function updateEmployee(req, res) {
   
    const originalName = req.body.originalName;
    
    const name = req.body.name;
    const email = req.body.email;
    const department = req.body.department;
    const location = req.body.location;


    Employees.query('UPDATE employees SET name = ?, email = ?, department = ?, location = ? WHERE name = ?', [name, email, department, location, originalName], (err, result) => {
        if(err){
            res.send(err);
        } else {
            res.status(201).json(name);
        }
    })
}

module.exports = updateEmployee