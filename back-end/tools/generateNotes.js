const axios = require('axios');
const NoteModel = require('../notes/note.model.js');
const serverInitHelper = require('./ServerInitHelper.js');


(async (number) => {
  try {
	await serverInitHelper.dbConnection();
	const tasks = [];
	for (let i = 0; i < number; i++) {
	  tasks.push(createNote);
	}
	Promise.all(tasks.map(func => func()))
		.then(() => {
		  console.log(`${number} notes without background were generated successfully!`)
		  process.exit(0);
		});
  } catch (error) {
	process.exit(1);
	console.error(error.message);
  }
})(10);


function createNote() {
  const Note = new NoteModel();
  return axios.get('https://freequote.herokuapp.com/').then(({data}) => {
    Note.data = data.quote || 'Some text here';
    Note.name = data.author || 'No name';
	return Note.save();
  });
}
