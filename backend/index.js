const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const allowedOrigins = ['http://13.58.13.94:3000', 'http://127.0.0.1:3000', 'http://localhost:3000'];

// const corsOptions = {
//     origin: (allowedOrigins, callback) => {
//         if (allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     }
// };

// app.use(cors(corsOptions));
// app.use(cors({ origin: 'http://13.58.13.94:3000', credentials: true }));
app.use(cors())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

// Enable CORS

// app.use(cors());
// app.use(cors({ origin: 'http://13.58.13.94:3000', credentials: true }));



// CORS SECTION ABOVE 


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