const express = require('express')
const router = express.Router()
const employeedata = require('./employeedata.js')
const departmentdata = require('./departmentdata.js')

// Add your routes here - above the module.exports line
router.get('/', (req, res) => {
    res.render('navigation'); 
});

router.get('/list-employees', async (req, res) => { 
    res.render('list-employees', { employees: await employeedata.getEmployees() } ) 
});


// Add your routes here - above the module.exports line
router.get('/list-salesemployees', async (req, res) => { 
    res.render('list-salesemployees', { employees: await employeedata.getSalesEmployees(), topEarner: await employeedata.getTopEarner() } ) 
});


router.get('/per-department/:department', async (req, res) => {
    res.render('per-department', { departmentEmployees: await departmentdata.getEmployeesInDepartment(req.params.department), departmentName: req.params.department} ); 
});

router.get('/addemployee', async(req, res)=>{ 
    res.render('newemployeeform', { employees: await employeedata.getEmployees() } ); 
  });


router.get('/addsalesemployee', async(req, res)=>{ 
    res.render('newsalesemployeeform', { employees: await employeedata.getSalesEmployees(), topEarner: await employeedata.getTopEarner()  } ); 
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
    const bank_regex = /^\s*[0-9]{8},\s(?!(?:0{6}|00-00-00))(?:\d{6}|\d\d-\d\d-\d\d)\s*$/
    if ((employee_name)&&(ni_number)&&(employee_address)&&(employee_postcode)&&(salary)&&(bank_detail)) {
        if(ni_regex.test(ni_number)){
            if(bank_regex.test(bank_detail)){ 
                let insertedKey = await employeedata.addEmployee(req.body) 
                res.render('list-employees', { employees: await employeedata.getEmployees()} ) 
            }else{
                res.locals.errormessage = "Incorrect bank details format" 
                res.render('newemployeeform', req.body ) 
            }
        } else {
            res.locals.errormessage = "Incorrect NI Number format" 
            res.render('newemployeeform', req.body ) 
            }
    } else {
        res.locals.errormessage = "Missing field" 
        res.render('newemployeeform', req.body ) 
        }
})

router.post('/addsalesemployee', async(req, res) => { 
    var employee = req.body 
    // validate here 
    var employee_name = req.body.employee_name; 
    var ni_number = req.body.ni_number; 
    var employee_address = req.body.employee_address; 
    var employee_postcode = req.body.employee_postcode; 
    var salary = req.body.salary; 
    var bank_detail = req.body.bank_detail; 
    const ni_regex = /^\s*[a-zA-Z]{2}(?:\s*\d\s*){6}[a-zA-Z]?\s*$/
    const bank_regex = /^\s*[0-9]{8},\s(?!(?:0{6}|00-00-00))(?:\d{6}|\d\d-\d\d-\d\d)\s*$/
    if ((employee_name)&&(ni_number)&&(employee_address)&&(employee_postcode)&&(salary)&&(bank_detail)) {
        if(ni_regex.test(ni_number)){
            if(bank_regex.test(bank_detail)){ 
                let insertedKey = await employeedata.addSalesEmployee(req.body) 
                res.render('list-salesemployees', { employees: await employeedata.getSalesEmployees(), topEarner: await employeedata.getTopEarner()} ) 
            }else{
                res.locals.errormessage = "Incorrect bank details format" 
                res.render('newsalesemployeeform', req.body ) 
            }
        } else {
            res.locals.errormessage = "Incorrect NI Number format" 
            res.render('newsalesemployeeform', req.body ) 
            }
    } else {
        res.locals.errormessage = "Missing field" 
        res.render('newsalesemployeeform', req.body ) 
        }
})

module.exports = router



