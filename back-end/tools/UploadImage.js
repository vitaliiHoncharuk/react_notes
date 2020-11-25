const multer = require('multer');
const config = require('../config');
const UploadImage = {};


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
	cb(null, config.server.imageSaveFolder);
  },

  filename: (req, file, cb) => {
	cb(null, file.originalname);
  }
});

UploadImage.upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
	console.log(file);
	if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
	  cb(null, true);
	} else {
	  cb(null, false);
	  return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
	}
  }
}).single('image');




module.exports = UploadImage;
