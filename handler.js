const uuidv4 = require('uuid/v4');
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

app.post("/tasks", function (request, response) {
    connection.query("INSERT INTO task SET ?", { id: uuidv4(), taskDescription: "taskDescription", completed: "completed", creationDate: "creationDate" }, function (err, results, fields) {

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

app.delete("/tasks/:id", function (request, response) {
connection.query("DELETE FROM task WHERE id = id", function(err, result, fields) {
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

app.put("/tasks/:id", function (request, response) {
  connection.query("UPDATE task SET completed = 'true' WHERE id = 'id'", function(err, result, fields) {
    if (err) {
      console.log("Error updating tasks", err);
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


module.exports.tasks = serverlessHttp(app);