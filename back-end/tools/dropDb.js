const serverInitHelper = require('./ServerInitHelper.js');

(async () => {
  try {
	await serverInitHelper.dbConnection();
	await serverInitHelper.dropDB();
	await serverInitHelper.__closeDbConnection();
	console.log('Success!');
	process.exit(0);
  } catch (error) {
	process.exit(1);
	console.error(error.message);
  }
})();
