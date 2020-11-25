const noteRouter = require('express').Router({ mergeParams: true });
const noteController = require('./note.controller.js');

noteRouter
	.get('/', noteController.getAllNotes)
	.post('/', noteController.createNote)
	.post('/image/', noteController.uploadImage)
	.delete('/:id', noteController.deleteNote);

module.exports = noteRouter;
