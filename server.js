require('console.table');

const inquirer = require('inquirer');
const mysql    = require('mysql2/promise'); //get the client...

let departments = [];
let roles       = [];
let employees   = [];

const PORT = process.env.PORT || 3001;

let connection;

// async function testQuery() {
    
//     // query database
//     // const [rows, fields] = await connection.execute('SELECT * FROM `employee` WHERE `first_name` = ? AND `last_name` > ?', ['foo', 'F']);
//     const [row, fields] = await connection.query('SELECT * FROM employee;');

// }

async function getAllDepartments() {

    const [row] = await connection.query('SELECT * FROM department');
    // console.log(row);
    console.table(row);
    mainMenu();

}

async function getAllEmployees() {

    const [row] = await connection.query('SELECT * FROM employee');
    // console.log(row);
    console.table(row);
    mainMenu();

}

async function getAllRoles() {

    const [row] = await connection.query('SELECT * FROM roles');
    // console.log(row);
    console.table(row);
    mainMenu();

}

async function addDepartment() {

    inquirer.prompt(addDepartmentQuestion).then(async res => {

        console.log(res);
        const [row] = await connection.query('INSERT INTO department SET ?', res, )
        // console.log(row);
        mainMenu();

    }) 

}

async function addRole() {

    const [row]        = await connection.query('SELECT * FROM department');
    let department     = row;
    let departmentList = department.map(({id, name}) => ({
        
        name: name, 
        value: id
    
    }));

    let addRoleQuestion = [
        
        {
        
            type:    "input",
            name:    "title",
            message: "Role name: "

        },

        {

            type:    "input",
            name:    "salary",
            message: "Salary: "

        },

        {
            
            type:    "list",
            name:    "department_id",
            message: "Department ID: ",
            choices: departmentList

        },

    ]

    inquirer.prompt(addRoleQuestion).then(async res => {

        console.log(res);
        const [row] = await connection.query('INSERT INTO roles SET ?', res, )
        // console.log(row);
        mainMenu();

    }) 

}

async function addEmployee() {

    const [row1]  = await connection.query('SELECT * FROM roles');
    let roles     = row1;
    let rolesList = roles.map(({title, salary, department_id}) => ({

        title: title,
        salary: salary,
        value: department_id

    }));

    const [row2]      = await connection.query('SELECT * FROM employee');
    let employees     = row2;
    let employeeList  = employees.map(({first_name, last_name, role_id, manager_id}) => ({

        first_name: first_name,
        last_name: last_name,
        role_id: role_id,
        value: manager_id

    }));

    let addEmployeeQuestion = [

        {

            type:    'input',
            name:    'first_name',
            message: 'First name: '

        },

        {

            type:    'input',
            name:    'last_name',
            message: 'Last name: '

        },

        {

            type:    'list',
            name:    'role_id',
            message: 'Role ID: ',
            choices: rolesList

        },

        {

            type:    'list',
            name:    'manager_id',
            message: 'Manager ID: ',
            choices: employeeList

        },

    ]

    inquirer.prompt(addEmployeeQuestion).then(async res => {

        console.log(res);
        const [row] = await connection.query('INSERT INTO employee SET ?', res, );
        mainMenu();

    })

}

async function updateEmployee() {

    const [row1]  = await connection.query('SELECT * FROM roles');
    let roles     = row1;
    let rolesList = roles.map(({department_id, title, salary, id}) => ({

        value: department_id,
        name: `${department_id} ${title} ${salary} ${id}`

    }));

    const [row2]      = await connection.query('SELECT * FROM employee');
    let employees     = row2;
    let employeeList  = employees.map(({id, first_name, last_name, role_id, manager_id}) => ({

        value: id,
        name: `${first_name} ${last_name}`

    }));

    let updateEmployeeQuestion = [

        {
            type: 'list',
            name: 'id',
            message: 'Select an employee: ',
            choices: employeeList
        },

        {

            type:    'list',
            name:    'role_id',
            message: 'Select a role: ',
            choices: rolesList

        },

    ]

    inquirer.prompt(updateEmployeeQuestion).then(async res => {

        const [row] = await connection.query(`UPDATE employee SET role_id = ${res.role_id} WHERE id = ${res.id}`);
        mainMenu();

    })

}

const mainMenuQuestions = [

    {

        type: 'list',
        message: 'Select an option:',
        choices: ['View all departments',
                  'View all roles', 
                  'View all employees', 
                  'Add a department', 
                  'Add a role', 
                  'Add an employee', 
                  'Update an employee role'], 
        name: 'mainSelection',
    
    }

];

const departmentQuestions = [

    {

        type: 'list',
        message: 'Select an option:',
        choices: roles,
        name: 'departmentSelection',

    }

];

const addDepartmentQuestion = [

    {

        type: 'input',
        message: 'Department name:',
        name: 'name',

    }

];

function mainMenu() {

    inquirer.prompt(mainMenuQuestions).then(res => {

        switch(res.mainSelection) {
            
            case 'View all departments':
                
                getAllDepartments();
                break; 
                
            case 'View all roles':
                
                getAllRoles();
                break;
            
            case 'View all employees':
            
                getAllEmployees();
                break;
            
            case 'Add a department':
            
                addDepartment();
                break;
            
            case 'Add a role':
            
                addRole();
                break;
            
            case 'Add an employee':
            
                addEmployee();
                break;
            
            case 'Update an employee role':
            
                updateEmployee();
                break; 

        }
        
    });    

}

function departmentMenu() {

    console.log(departments);

}

async function init() {

    // create the connection
    connection = await mysql.createConnection({host:'localhost', user: 'root', password: 'password', database: 'employeeDb'});

    mainMenu();

}

init();