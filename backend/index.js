const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// app.use(cors(corsOptions));

// *******

app.use(cors({ origin: 'http://3.20.235.110:3000', credentials: true }));


// *******



app.use(bodyParser.json());

app.use(function (req, res, next) {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // *** AWS Config code for CORS
    res.setHeader('Access-Control-Allow-Origin', 'http://3.20.235.110:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// Enable CORS

app.use(cors());
// app.use(cors({
//     origin: "http://localhost:3000"
// }));



// CORS SECTION ABOVE 


const port = 3001;

const notes = [];

app.get('/', (req, res) => {
    console.log("GET : / called!");
    res.send('Hello, World!');
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

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});