const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
//const store = require('../db/store');
const { readFromFile, readAndAppend, writeToFile } = require('../db/fsUtils.js');

// getting the notes
app.get('/notes', (req, res) => {
    readFromFile('db/db.json')
        .then((notes) => {
            return res.json(JSON.parse(notes));
        })
        .catch(err => {
            console.log(err);
        })
});

// adding new notes
app.post('/notes', (req, res) => {
    const noteId = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    }
    readAndAppend(noteId, 'db/db.json');
});

// deleting the notes
app.delete('/notes/:id', (req, res) => {
    const deletedNote = req.params.id;
    readFromFile('db/db.json')
        .then((notes) => JSON.parse(notes))
        .then((parsedNotes) => {
            const newArray = parsedNotes.filter((note) => note.id !== deletedNote);
            writeToFile('db/db.json', newArray);
        })
});

module.exports = app;