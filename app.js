const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

const TaskList = require('./database/models/taskList');
const Task = require('./database/models/task');

/*
CORS - Cross Origin Request Security
Backend - http://localhost:3000
Frontend - http://localhost:4200
*/
// 3rd party library, app.use(cors());
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin', 'X-Requested-With, Content-Type, Accept');
    // Pass to next layer of middleware
    next();
});

//Example of middleware
app.use(express.json());// Or 3rd party bodyParser

//Routes or REST API Endpoints or RESTFul webservices Endpoints
/*
TaskList - Create, Update, ReadTaskListById, ReadAllTaskList
Task - Create, Update, ReadTaskById, ReadAllTask
*/

// Routes or API endpoints for TaskList model
// Get All Task Lists
// http://localhost:3000/tasklists  => [ {TaskList}, {TaskList} ]
// https://www.restapitutorial.com/lessons/httpmethods.html

/*app.get('/tasklists', function(req, res){
    TaskList.find({})
        .then(function(lists) {res.send(lists)})
        .catch(function(error) {console.log(error)});
});*/

app.get('/tasklists', (req, res) => {
    TaskList.find({})
        .then((lists) => {
            res.status(200).send(lists);
        })
        .catch((error) => {
            console.log(error);
            res.status(500);
        });
});

//Endpoint to get one tasklist by taklistId : http://localhost:3000/tasklists/60de196f11039f060886ddb5
app.get(
    '/tasklists/:tasklistId', (req, res) => {
        let tasklistId = req.params.tasklistId;
        TaskList.find({ _id: tasklistId })
            .then((taskList) => {
                res.status(200).send(taskList)
            })
            .catch((error) => { console.log(error) });
    }
);


// Route or Endpoint for creating a TaskList
app.post('/tasklists', (req, res) => {
    //console.log("hello i am inside post method");
    console.log(req.body);

    let taskListObj = { 'title': req.body.title };
    TaskList(taskListObj).save()
        .then((taskList) => {
            res.status(201).send(taskList);
        })
        .catch((error) => {
            console.log(error);
            res.status(500);
        });

});
//PUT is full update of object
app.put('/tasklists/:tasklistId', (req, res) => {
    TaskList.findOneAndUpdate({ _id: req.params.tasklistId }, { $set: req.body })
        .then((taskList) => {
            res.status(200).send(taskList)
        })
        .catch((error) => { console.log(error) });
});
// Patch is partial update of one field of an object
app.patch('/tasklists/:tasklistId', (req, res) => {
    TaskList.findOneAndUpdate({ _id: req.params.tasklistId }, { $set: req.body })
        .then((taskList) => {
            res.status(200).send(taskList)
        })
        .catch((error) => { console.log(error) });
});

//Delete a tasklist by id
app.delete('/tasklists/:tasklistId', (req, res) => {
    TaskList.findByIdAndDelete(req.params.tasklistId)
        .then((taskList) => {
            res.status(201).send(taskList)
        })
        .catch((error) => { console.log(error) });
});

/*app.listen(3000, function () {
    console.log("Server started on port 3000");
});*/

app.listen(3000, () => {
    console.log("Server started on port 3000");
});