const express = require('express');
const cors = require('cors');
const config = require('./config');
const bodyParser = require('body-parser');
const maxUploadFileSize = '10mb';
const app = express();
const {ServerInitHelper} = require('./tools');


app.use(express.urlencoded({extended:true}));
app.use('/public', express.static('public'));
app.use(express.json());
app.use(bodyParser.json({limit: maxUploadFileSize}));
app.use(bodyParser.urlencoded({limit: maxUploadFileSize, extended: true}));
app.use(cors());


app.use('/api/notes', require('./notes/note.router.js'));

ServerInitHelper.dbConnection()
	.then(() => {
	  app.listen(config.server.port, () => {
	    console.log(`Server is listening on port -- ${config.server.port}`)
	  })
	})
	.catch(err => {
	  console.error(err.stack);
	  throw err;
	});

app.use((req, res, next) => {
  setImmediate(() => {
	next(new Error('Something went wrong'));
  });
});
