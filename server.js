/*********************************************************************************
*  WEB700 – Assignment 04
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Lakshmi Apoorva Student ID: 151316239 
*  Online (vercel) Link: https://web-programming-assignment-4-mu96.vercel.app/
*
********************************************************************************/

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const collegeData = require('./modules/collegeData'); 

const app = express();
const port = process.env.PORT || 8080;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize the data collection
collegeData.initialize().then(() => {
    console.log("Data Initialized");
}).catch(err => {
    console.error("Error initializing data: ", err);
});

// Route to serve the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Route to serve the about page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Route to serve the htmlDemo page
app.get('/htmlDemo', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'htmlDemo.html'));
});

// Route to serve the add student form
app.get('/students/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'addStudent.html'));
});

// Handle form submission for adding a new student
app.post('/students/add', (req, res) => {
    collegeData.addStudent(req.body).then(() => {
        res.redirect('/students');
    }).catch(err => {
        res.status(500).send('Error adding student: ' + err);
    });
});

// Route to display the list of students
app.get('/students', (req, res) => {
    collegeData.getAllStudents().then(students => {
        // Here you might render a view or send JSON, adjust as needed
        res.json(students); // This assumes you want to send JSON. Adjust as necessary.
    }).catch(err => {
        res.status(500).send('Error retrieving students: ' + err);
    });
});

// Route to display the list of TAs
app.get('/students/TAs', (req, res) => {
    collegeData.getTAs().then(TAs => {
        res.json(TAs); // This assumes you want to send JSON. Adjust as necessary.
    }).catch(err => {
        res.status(500).send('Error retrieving TAs: ' + err);
    });
});

// Route to display all courses
app.get('/courses', (req, res) => {
    collegeData.getCourses().then(courses => {
        res.json(courses); // This assumes you want to send JSON. Adjust as necessary.
    }).catch(err => {
        res.status(500).send('Error retrieving courses: ' + err);
    });
});

// Route to display a student by number
app.get('/students/:num', (req, res) => {
    collegeData.getStudentByNum(req.params.num).then(student => {
        res.json(student); // This assumes you want to send JSON. Adjust as necessary.
    }).catch(err => {
        res.status(500).send('Error retrieving student: ' + err);
    });
});

// Route to display students by course
app.get('/students/course/:course', (req, res) => {
    collegeData.getStudentsByCourse(req.params.course).then(students => {
        res.json(students); // This assumes you want to send JSON. Adjust as necessary.
    }).catch(err => {
        res.status(500).send('Error retrieving students by course: ' + err);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
