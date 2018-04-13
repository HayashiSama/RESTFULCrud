// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory

// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.use(express.static( __dirname + '/myFirstAngularApp/dist' ));


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tasks');

var TaskSchema = new mongoose.Schema({
    title:  { type: String, required: true},
    description: {type: String, default: ""},
    completed: {type: Boolean, default: false},
}, {timestamps: true });


mongoose.model('Task', TaskSchema); // We are setting this Schema in our Models as 'User'
var Task = mongoose.model('Task'); // We are retrieving this Schema from our Models, named 'User'

app.get('/tasks', function(req, res) {
    Task.find({}, function(err, tasks) {
        console.log(tasks)
        if(err){
            res.json({message:"error", error: err})
        }
        else{
            res.json({message: "Success", data: tasks})
        }
        
        
    }) 
})

app.post('/new', function(req, res) {
    var newTask = new Task(req.body)
    console.log(req.body)
    newTask.save(function(err){
        if(err){
            res.json({message:"error", error: err})
        }
        else{
            res.json({message: "Success"})
        }
    })
})

app.get('/remove/:id/', function(req, res) {
    Task.remove({_id: req.params.id}, function(err){
        if(err){
            res.json({message:"error", error: err})
        }
        else{
            res.json({message: "Success"})
        }
        console.log(err)
    })

})

app.post('/update', function(req, res){
    console.log(req.body)
    Task.find({_id: req.body._id}, function(err, tasks) {
        tasks[0].title = req.body.title;
        tasks[0].description = req.body.description;
        tasks[0].save(function(err){
                if(err){
                    res.json({message: err, errors: err})
                }
                else{
                    res.json({message: "Success"})
                }
            })
    
        })
})

app.get('/tasks/:id', function(req, res) {
    Task.findOne({_id: req.params.id}, function(err, task) {
        if(err || !task){
            if(!task){
                res.json({message:"error", error: "No Task Found"})
            }
            else{
                res.json({message:"error", error: err})
            }
        }
        else{
            res.json({message: "Success", data: task})
        }

        
    }) 
})

app.post('/tasks', function(req, res) {
    console.log(req)
    res.json({message: "This is a Post Request", data: req.body})
})





// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})