const mysql = require('mysql'); 
const dbconfig = require('./dbconfig.json'); 
const util = require ('util')
const db = wrapDB(dbconfig)

function wrapDB (dbconfig) { 
    const pool = mysql.createPool(dbconfig) 
    return { 
        query(sql, args) { 
            console.log("in query in wrapper") 
            return util.promisify( pool.query ) 
            .call(pool, sql, args) 
        }, 
        release () { 
            return util.promisify( pool.releaseConnection ) 
            .call( pool ) 
        } 
    } 
}

getEmployeesAll = async (  ) => { 
    return await db.query( 
        "SELECT * FROM Employee") 
 }

exports.getEmployees = async () => { 
    return await getEmployeesAll(); 
}

getSalesEmployeesAll = async (  ) => { 
    return await db.query( 
        "select * from Employee Join SalesEmployee using (employee_id )") 
 }

exports.getSalesEmployees = async () => { 
    return await getSalesEmployeesAll(); 
}

getTopEarner = async (  ) => { 
    return await db.query( 
        "SELECT *, MAX(total_sales) FROM Employee JOIN SalesEmployee using(employee_id);") 
 }

exports.getTopEarner = async () => { 
    return await getTopEarner(); 
}

exports.addEmployee = async (newEmployee) => { 
    let results = await db.query('INSERT INTO Employee SET ?', newEmployee) 
    return results.insertId; 

}


exports.addEmployee = async (newEmployee) => { 
    let results = await db.query(`INSERT INTO Employee (employee_name, ni_number, employee_address, employee_postcode, salary, bank_detail, is_manager,active, employee_type) VALUES (${newEmployee.employee_name}, ?, ?, ?, ?, ?,?,?,?)`) 
    
    return results.insertId; 

}


exports.addSalesEmployee = async (newSalesEmployee) => { 
    console.log(newSalesEmployee);
    const justEmployee = {
        employee_id: newSalesEmployee.employee_id,
        employee_name: newSalesEmployee.employee_name,
        ni_number: newSalesEmployee,

    };
    let results = await db.query('INSERT INTO SalesEmployee SET ?', newSalesEmployee) 
    return results.insertId; 
}