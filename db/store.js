const fs = require('fs');
const util = require('util');
const uuid = require('uuid');

const readAFile = util.promisify(fs.readFile);
const writeAFile = util.promisify(fs.writeFile);

class StoreNotes {
    read(){
        return readAFile('db/db.json', 'utf-8');
    }

    write(note) {
        return writeAFile('db/db.json', JSON.stringify(note, null, 4))
    }

    // Getting the notes
    grabNotes(){
        return this.read().then((notes) => {
            let parsedNotes;

            try{
                parsedNotes = [].concat(JSON.parse(notes));
            } catch(err) {
                parsedNotes = [];
            }
            return parsedNotes;
        })
    }

    // Adding the notes
    addNotes(notes) {
        const { title, text } = notes;
        if(!title || !text) {
            throw new Error('Title and/or Text cannot be blank! Please input info for a note!')
        }

        const newNote = { title, text, id: uuid.v1() };
        return this.grabNotes().then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote)
    }

    // Removing a note
    deleteNote(id) {
        return this.grabNotes().then((notes) => notes.filter((note) => note.id !== id))
        .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new StoreNotes;