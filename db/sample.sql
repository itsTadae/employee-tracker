USE employee_db;

INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 90000, 1), ('Salesperson', 60000, 1), ('Software Engineer', 120000, 2), ('Accountant', 99000, 3), ('Lawyer', 180000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('John', 'Doe', 1, null);