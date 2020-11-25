const config = {};


config.server = {
  db: 'mongodb://localhost/notes',
  dbOptions: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  port: 9000,
  host: 'http://localhost:3000',
  apiLink: 'http://localhost:3000/api/notes',
  databaseSecret: '',
  imageSaveFolder: '../front/notes/public/images',
};


module.exports = config;
