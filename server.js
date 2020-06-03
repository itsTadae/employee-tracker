const inquirer = require("inquirer");
const mySQL = require("mySQL");

var connection = mySQL.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log();
  databaseOptions();
});

function databaseOptions() {
    inquirer.prompt({
        message: "what would you like to do?",
        type: "list",
        choices: [
            "add employee",
            "add department",
            "add role",
            "update employee role",
            "view all departments",
            "view all employees",
            "QUIT"
        ],
        name: "choice"
    }).then(answers => {
        console.log(answers.choice);
        switch (answers.choice) {
            case "add employee":
                addEmployee()
                break;

            case "add department":
                addDepartment()
                break;

            case "add role":
                addRole()
                break;

            case "update employee role":
                updateEmployeeRole();
                break;
            
            case "view all employees":
                viewEmployees()
                break;
    
            case "view all departments":
                viewDepartments()
                break;

            default:
                connection.end()
                break;
    
        }
    })
}
