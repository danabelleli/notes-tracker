const express = require('express');
const app = express();
const store = require('../db/store');

app.get('./notes', (req, res) => {
    store.getNotes().then((notes) => {
        return res.json(notes);
    }).catch(err => {
        console.log(err);
    })
});

// Add an app.post method

module.exports = app;