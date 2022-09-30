const fs = require('fs');
const { networkInterfaces } = require('os');
const util = require('util');
const uuidv1 = require('uuid/v1');

const readAFile = util.promisify(fs.readFile);
const writeAFile = util.promisify(fs.writeFile);

class StoreNotes {
    read(){
        return readAFile('db/db.json', 'utf-8');
    }

    write(note) {
        return writeAFile('db/db.json', JSON.stringify(note))
    }

    // Getting the notes
    grabNotes(){
        return this.read().then((notes) => {
            let parsedNotes = [];

            try{
                parsedNotes.push(JSON.parse(notes))
            } catch(err) {
                console.log('There was an error adding notes to the array')
            }
            return parsedNotes;
        })
    }

    // Adding the notes
    addNotes() {
        const { title, text } = notes;
        if(!title || !text) {
            throw new Error('Title and/or Text cannot be blank! Please input info for a note!')
        }

        const newNote = { title, text, id: uuidv1() };
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