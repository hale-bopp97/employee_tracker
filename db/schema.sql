DROP DATABASE IF EXISTS employeeDb;

CREATE DATABASE employeeDb;

USE employeeDb;

CREATE TABLE department (

    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL

);

CREATE TABLE roles (

    id INT AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(9, 2) UNSIGNED NOT NULL,
    department_id INT UNSIGNED ,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL

);

CREATE TABLE employee (

    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL

);