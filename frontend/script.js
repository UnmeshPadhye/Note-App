const noteForm = document.getElementById('note-form');
const notesList = document.querySelector('#notes-list');

let notes = [];

const addNote = (title, content) => {
    fetch('http://localhost:3000/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, body: content })
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            console.log('Note added:', data);
            getNotes();
        })
        .catch(err => console.error(err));
};

const deleteNote = id => {
    fetch(`http://localhost:3000/notes/${id}`, {
        method: 'DELETE'
    })
        .then(res => {
            notes = notes.filter(note => note.id !== id);
            renderNotes();
        })
        .catch(err => console.error(err));
};

// function getNotes() {
//     fetch('http://localhost:3000/notes')
//         .then(res => res.json())
//         .then(data => {
//             // Update the UI with the notes
//             notesList.innerHTML = '';

//             data.forEach(note => {
//                 const noteEl = document.createElement('div');
//                 noteEl.classList.add('note');
//                 noteEl.innerHTML = `
//             <h2>${note.title}</h2>
//             <p>${note.body}</p>
//           `;
//                 notesList.appendChild(noteEl);
//             });
//         })
//         .catch(err => console.error(err));
// }

function getNotes() {
    fetch('http://localhost:3000/notes')
        .then(res => res.json())
        .then(data => {
            notesList.innerHTML = '';

            data.forEach(note => {
                const noteEl = document.createElement('div');
                noteEl.classList.add('note');
                noteEl.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.body}</p>
          `;
                notesList.appendChild(noteEl);
            });
        })
        .catch(err => console.error(err));
}


const renderNotes = () => {
    notesList.innerHTML = '';
    notes.forEach(note => {
        const noteItem = document.createElement('li');
        const deleteButton = document.createElement('button');

        noteItem.innerText = `${note.title}: ${note.content}`;
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => deleteNote(note.id));

        noteItem.appendChild(deleteButton);
        notesList.appendChild(noteItem);
    });
};

noteForm.addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('note-title').value;
    const content = document.getElementById('note-content').value;
    addNote(title, content);
    noteForm.reset();
});


window.addEventListener('load', getNotes);

fetch('http://localhost:3000/notes')
    .then(res => res.json())
    .then(data => {
        notes = data;
        renderNotes();
    })
    .catch(err => console.error(err));
