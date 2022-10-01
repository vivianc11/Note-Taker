// Importing
const apiRouter = require('express').Router();
const store = require('../db/store.js');

// getting the notes and formatting it to .json
apiRouter.get('/notes', (req, res) => {
    store.grabNotes().then((notes) => {
        return res.json(notes)
    }).catch((err) => console.log(err))
});

// posting the notes 
apiRouter.post('/notes', (req, res) => {
    store.addNotes(req.body).then((note) => res.json(note))
    .catch((err) => console.log(err))
})

// deleting the notes
apiRouter.delete('/notes/:id', (req, res) => {
    store.deleteNote(req.params.id).then(() => res.json({ ok: true }))
    .catch((err) => console.log(err))
})

// Exporting
module.exports = apiRouter;