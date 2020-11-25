const {ErrorHandler} = require('../tools');
const NoteModel = require('./note.model.js');
const multer = require('multer');
const {UploadImage} = require('../tools');

class NoteController {
  async uploadImage(req, res) {
	try {
	  UploadImage.upload(req, res, function (err) {

	    if (err instanceof multer.MulterError) {
		  ErrorHandler.response(res, error.stack, 500);
		}

		res.status(200).send({ message: 'OK' });
	  });
	} catch (error) {
	  console.log(error);
	  ErrorHandler.response(res, error.stack, 500);
	}
  }

  async createNote(req, res) {
	try {
      const {data, name, image} = req.body;

      const note = new NoteModel({data, name , image});
      await note.save();

      res.send({ message: 'OK' });

	} catch (error) {
	  console.log(error);
	  ErrorHandler.response(res, error.stack, 500);
	}
  }

  async deleteNote(req, res) {
	try {
	  const {id} = req.params;
      const note = await NoteModel.findByIdAndRemove(id);

	  console.log(note);
	  if (!note) {
        ErrorHandler.response(res, 'Note not found', 404);
	  }

      res.send({ message: 'OK'});
	} catch (error) {
	  console.log(error);
	  ErrorHandler.response(res, error.stack, 500);
	}
  }

  async getAllNotes(req, res) {
    try {
	  const result = await NoteModel.find({}).lean();

	  res.send(result);
	} catch (error) {
	  console.log(error);
	  ErrorHandler.response(res, error.stack, 500);
	}
  }
}

const noteController = new NoteController();

module.exports = noteController;
