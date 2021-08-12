const express = require('express')
const router = express.Router()
const employeedata = require('./employeedata.js')

// Add your routes here - above the module.exports line
router.get('/list-employees', async (req, res) => { 
    res.render('list-employees', { employees: await employeedata.getEmployees() } ) 
});


// Add your routes here - above the module.exports line
router.get('/list-salesemployees', async (req, res) => { 
    res.render('list-salesemployees', { employees: await employeedata.getSalesEmployees(), topEarner: await employeedata.getTopEarner() } ) 
});



module.exports = router
