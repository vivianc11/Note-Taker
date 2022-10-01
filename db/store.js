// Importing
const fs = require('fs');
const util = require('util');
const uuid = require('uuid');

// Using promises to read and write files
const readAFile = util.promisify(fs.readFile);
const writeAFile = util.promisify(fs.writeFile);

// Creating a class that stores the notes
class StoreNotes {
    // Function to read a notes in db/db.json
    read(){
        return readAFile('db/db.json', 'utf-8');
    }

    // Function to write a note to db/db.json
    write(note) {
        return writeAFile('db/db.json', JSON.stringify(note, null, 4))
    }

    // Getting the notes
    grabNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            // Concatting the JSON parsed notes into an array 
            try {
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
        // getting the notes from db and then adding the newNote into the same array to create updatedNotes
        return this.grabNotes().then((notes) => [...notes, newNote])
        // then write the updatedNotes 
        .then((updatedNotes) => this.write(updatedNotes))
    }

    // Removing a note
    deleteNote(id) {
        // geting the notes from db and filtering the notes by id
        // if the note id does not equal the selected note id, then it gets added to filteredNotes and is written in the db file
        // the note that does equal the selected id is then 'deleted'
        return this.grabNotes().then((notes) => notes.filter((note) => note.id !== id))
        .then((filteredNotes) => this.write(filteredNotes));
    }
}

// Exporting
module.exports = new StoreNotes;