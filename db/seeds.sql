USE employeeDb;

INSERT INTO department(name)
VALUES ("department 1"),
       ("department 2"),
       ("department 3"),
       ("department 4");

INSERT INTO roles(title, salary, department_id)
VALUES ("role 1", 100000.12, 1),
       ("role 2", 45000.12, 3),
       ("role 3", 9900.12, 4),
       ("role 4", 88888.44, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("bob", "b", 1, NULL),
       ("alice", "a", 3, 1),
       ("eve", "E", 2, 1),
       ("foo", "F", 2, 1);