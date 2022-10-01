// Importing
const htmlRouter = require("express").Router();
const path = require('path');

// /notes will take the user to the notes page
htmlRouter.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
});

// /anything other than notes will take the user to the front page
htmlRouter.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
});

// Exporting
module.exports = htmlRouter;