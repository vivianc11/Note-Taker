const apiRouter = require(express).Router();
const path = require('path');
const store = require('../db/store.js');

router.get('/notes', (req, res) => {
    store.grabNotes().then((notes) => {
        return res.json(notes)
    }).catch((err) => console.log(err))
});

router.post('/notes', (req, res) => {
    store.addNotes(req.body).then((note) => res.json(note))
    .catch((err) => console.log(err))
})

router.delete('/notes/:id', (req, res) => {
    store.deleteNote(req.params.id).then(() => res.json({ ok: true }))
    .catch((err) => console.log(err))
})

module.exports = apiRouter;