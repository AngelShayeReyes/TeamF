const express = require('express')
const router = express.Router()
const employeedata = require('./employeedata.js')
const departmentdata = require('./departmentdata.js')

// Add your routes here - above the module.exports line
router.get('/list-employees', async (req, res) => { 
    res.render('list-employees', { employees: await employeedata.getEmployees() } ) 
});

router.get('/per-department/:department', async (req, res) => {
    res.render('per-department', { departmentEmployees: await departmentdata.getEmployeesInDepartment(req.params.department), departmentName: req.params.department} ); 
});

module.exports = router
