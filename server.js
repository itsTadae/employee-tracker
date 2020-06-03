const inquirer = require("inquirer");
const mySQL = require("mySQL");

var connection = mySQL.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "111222333",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log();
  databaseOptions();
});

function databaseOptions() {
  inquirer
    .prompt({
      message: "what would you like to do?",
      type: "list",
      choices: [
        "add employee",
        "add department",
        "add role",
        "update employee role",
        "view all departments",
        "view all employees",
        "QUIT",
      ],
      name: "choice",
    })
    .then((answers) => {
      console.log(answers.choice);
      switch (answers.choice) {
        case "view all employees":
          viewEmployees();
          break;

        case "view all departments":
          viewDepartments();
          break;

        case "add employee":
          addEmployee();
          break;

        case "add department":
          addDepartment();
          break;

        case "add role":
          addRole();
          break;

        case "update employee roles":
          updateEmployeeRoles();
          break;

        default:
          connection.end();
          break;
      }
    });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, data) {
    console.table(data);
    databaseOptions();
  });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, data) {
    console.table(data);
    databaseOptions();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter employees first name:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter employees last name:",
      },
      {
        type: "number",
        name: "roleId",
        message: "Enter employees role ID:",
      },
      {
        type: "number",
        name: "managerId",
        message: "Enter employees manager's ID:",
      },
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [res.firstName, res.lastName, res.roleId, res.managerId],
        function (err, data) {
          if (err) throw err;
          console.table("Successfully added employee");
          databaseOptions();
        }
      );
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What department would you like to add?",
      },
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        [res.department],
        function (err, data) {
          if (err) throw err;
          console.table("Successfully added the department");
          databaseOptions();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        message: "Enter employee title:",
        type: "input",
        name: "title",
      },
      {
        message: "Enter employee salary:",
        type: "number",
        name: "salary",
      },
      {
        message: "Enter department ID:",
        type: "number",
        name: "department_id",
      },
    ])
    .then(function (response) {
      connection.query(
        "INSERT INTO roles (title, salary, department_id) values (?, ?, ?)",
        [response.title, response.salary, response.department_id],
        function (err, data) {
          console.table(data);
        }
      );
      databaseOptions();
    });
}

function updateEmployeeRoles() {
  inquirer
    .prompt([
      {
        message: "Enter the name of the employee you would like to update:",
        type: "input",
        name: "name",
      },
      {
        message: "enter new role ID:",
        type: "number",
        name: "role_id",
      },
    ])
    .then(function (response) {
      connection.query(
        "UPDATE employee SET role_id = ? WHERE first_name = ?",
        [response.role_id, response.name],
        function (err, data) {
          console.table(data);
        }
      );
      databaseOptions();
    });
}
