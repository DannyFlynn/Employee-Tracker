const express = require('express');
const router = express.Router();

//controller actions required below 
const {allEmployees, singleEmployee } = require('../controllers/getEmployees');
const createEmployee = require('../controllers/createEmployee');
const deleteEmployee = require('../controllers/deleteEmployee');
const updateEmployee = require('../controllers/updateEmployee');

router.get('/', (req, res) => {
    res.status(302).redirect('/employees');
})



router.get('/employees', allEmployees);

router.get('/employees/:id', singleEmployee);

router.post('/addEmployee', createEmployee);

router.delete('/deleteEmployee/:id', deleteEmployee);

router.put('/updateEmployee', updateEmployee);



/*router.delete('/deleteEmployee/:id', (req, res) => {
    res.status(200).send('deleted');
})*/


module.exports = router