const Employees = require("../db/employeeDb");

function  deleteEmployee(req, res) {
  
  const id = req.params.id;
    Employees.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
      
    if(err){
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
  })
}

module.exports = deleteEmployee