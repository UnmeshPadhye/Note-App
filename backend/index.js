const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());

// Enable CORS
const corsOptions = {
    origin: 'http://13.58.13.94:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}


// app.use(cors());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cors({ origin: 'http://13.58.13.94:3000', credentials: true }));

const port = 3001;

const notes = [];

app.get('/', (req, res) => {
    console.log("GET : / called!");
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});


app.post('/notes', (req, res) => {

    console.log("POST : /notes called!");
    const newNote = {
        title: req.body.title,
        content: req.body.content,
    };
    notes.push(newNote);
    res.status(201).json(newNote);
});


app.get('/notes', (req, res) => {
    console.log("GET : /notes called!");
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