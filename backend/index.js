const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());

// Enable CORS
app.use(cors());

const port = 3001;

const notes = [];

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});


app.post('/notes', (req, res) => {
    const newNote = {
        title: req.body.title,
        body: req.body.body,
    };
    notes.push(newNote);
    res.status(201).json(newNote);
});


app.get('/notes', (req, res) => {
    res.send(notes);
});

app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    // TODO: Implement the code to retrieve a single note from the database using the ID parameter
    res.send(`Note ${id}`);
});

app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    // TODO: Implement the code to update a note in the database using the ID parameter and the request body
    res.send(`Note ${id} updated`);
});

app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    // TODO: Implement the code to delete a note from the database using
});