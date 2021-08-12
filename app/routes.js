const express = require('express')
const router = express.Router()
const employeedata = require('./employeedata.js')

// Add your routes here - above the module.exports line
router.get('/list-employees', async (req, res) => { 
    res.render('list-employees', { employees: await employeedata.getEmployees() } ) 
});

router.get('/addemployee', async(req, res)=>{ 
    res.render('newemployeeform', { employees: await employeedata.getEmployees() } ); 
  });

  router.post('/addemployee', async(req, res) => { 
    var employee = req.body 
    // validate here 
    var employee_name = req.body.employee_name; 
    var ni_number = req.body.ni_number; 
    var employee_address = req.body.employee_address; 
    var employee_postcode = req.body.employee_postcode; 
    var salary = req.body.salary; 
    var bank_detail = req.body.bank_detail; 
    const ni_regex = /^\s*[a-zA-Z]{2}(?:\s*\d\s*){6}[a-zA-Z]?\s*$/
    if ((employee_name)&&(ni_number)&&(employee_address)&&(employee_postcode)&&(salary)&&(bank_detail)) {
        if(ni_regex.test(ni_number)){ 
        let insertedKey = await employeedata.addEmployee(req.body) 
        res.render('list-employees', { employees: await employeedata.getEmployees()} ) 
        } else {
            res.locals.errormessage = "Incorrect NI Number format" 
            res.render('newemployeeform', req.body ) 
            }
    } else {
        res.locals.errormessage = "Missing field" 
        res.render('newemployeeform', req.body ) 
        }
    })

module.exports = router



