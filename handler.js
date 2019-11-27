const express = require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");


const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "get_stuff_done"
});

app.get("/tasks", function (request, response) {
  connection.query("SELECT * FROM task", function (err, data) {
    if (err) {
      console.log("Error fetching tasks", err);
      response.status(500).json({
        error: err
      });
    } else {
      response.json({
        tasks: data
      });
    }
  });
});

// reference for these bits of logic: https://www.npmjs.com/package/mysql
app.post("/tasks", function (request, response) {
  connection.query("INSERT INTO task SET ?", { id: "005", taskDescription: "Refill handsoap", completed: "false", creationDate: "2019-11-27", userId: "2" }, function (err, results, fields) {
    if (err) {
      console.log("Error posting tasks", err);
      response.status(500).json({
        error: err
      });
    } else {
      response.json({
        tasks: fields
      })
    }
  })
});

app.delete("/tasks/:taskId", function (request, response) {
connection.query("DELETE FROM task WHERE id = '005'", function(err, result, fields) {
  if (err) {
    console.log("Error deleting tasks", err);
    response.status(500).json({
      error: err
    });
  } else {
    response.json({
      tasks: result
    })
  }
})
});

app.put("/tasks/:taskId", function (request, response) {
  // WRITE LOGIC FOR PUT FOLLOWING GET SECTION + SEARCHING THINGS HERE: https://www.npmjs.com/package/mysql
});


module.exports.tasks = serverlessHttp(app);