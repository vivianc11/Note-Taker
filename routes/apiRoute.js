const apiRouter = require(express).Router();
const path = require('path');
const store = require('../db/store.js');

router.get('/notes', (req, res) => {
    store.grabNotes().then((notes) => {
        return res.json(notes)
    }).catch((err) => console.log(err))
})