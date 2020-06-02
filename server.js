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

function databaseOptions() {}
