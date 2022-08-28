// functionality on getting all emlpoyee information
const Employees = require('../db/employeeDb');

function allEmployees(req, res) {
    Employees.query("SELECT * FROM employees ORDER BY name", (err, result) => {
        if(err){
            res.send(err);
        } else {
            //res.status(200).json(result);
            res.status(200).render('employees', { employees: result});
        }
    })
    //res.status(200).send('yes');
}

function singleEmployee(req, res) {
    const person = req.params.id;

    Employees.query("SELECT * FROM employees WHERE name = ?", person, (err, result) => {
        if(err) {
            res.send(err);
        } else {
            
            const items = result.map(p => {
               return [p.name, p.email, p.department, p.location];
            })
            res.status(200).json(items);
        }
    })
   
}




module.exports = { allEmployees, singleEmployee }
