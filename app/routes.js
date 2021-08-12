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
    if(employee_name){ 
    
      let insertedKey = await employeedata.addEmployee(req.body) 
      res.render('list-employees', { employees: await employeedata.getEmployees()} ) 
  } else {
      res.locals.errormessage = "Name needed" 
      res.render('newemployeeform', req.body ) 
    }
  })

  
module.exports = router
