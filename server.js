require('console.table');
const inquirer = require('inquirer');
// const fs       = require('fs');
const mysql    = require('mysql2/promise'); //get the client...


let departments = [];
let roles       = [];
let employees   = [];

const PORT = process.env.PORT || 3001;

let connection;

async function testQuery() {
    
    // query database
    // const [rows, fields] = await connection.execute('SELECT * FROM `employee` WHERE `first_name` = ? AND `last_name` > ?', ['foo', 'F']);
    const [row, fields] = await connection.query('SELECT * FROM employee;');

    // console.log(row);
    // console.log(fields);

}

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

    const [row] = await connection.query('SELECT * FROM department');
    let department = row;
    let departmentList = department.map(({id, name}) => ({
        name: name, 
        value: id
    }));

    let addRoleQuestion = [
        
        {
        
            type: "input",
            name: "title",
            message: "Role name: "

        },

        {

            type: "input",
            name: "salary",
            message: "Salary: "

        },

        {
            
            type: "list",
            name: "department_id",
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
            
                console.log('aae');
                break;
            
            case 'Update an employee role':
            
                console.log('uaer');
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
    // testQuery();
    // getAllDepartments();
    mainMenu();

}

init();