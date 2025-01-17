const { nanoid } = require('nanoid');
const notes = require('../../api/notes');

class NotesService {
  constructor() {
    this._notes = [];
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title, tags, body, id, createdAt, updatedAt,
    };

    this._notes.push(newNote);

    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

    if (!isSuccess) {
      throw new Error('could not add note');
    }

    return id;
  }

  getNotes(){
    return this._notes;
  }

  getNotesById(id){
    const note = this._notes.filter((n) => n.id === id)[0];
    if (!note) {
      throw new Error('Could not find note');
    }
    return note;
  }

  editNoteById(id, { title, body, tags }){
    const index = notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new Error('Could update note, Id not found');
    }
    const updatedAt = new Date().toISOString();

    this._notes[index] = {
      ...this._notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  deleteNoteById(id){
    const index = this._notes.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new Error('Could not delete note, Id not found');
    }

    this._notes.splice(index, 1);
  }
}

module.exports = NotesService;