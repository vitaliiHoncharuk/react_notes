const mongoose = require('mongoose');
const db = mongoose.connection;
const config = require('../config');


class ServerInitHelper {
  static dbConnection() {
    return ServerInitHelper.__mongoDbConnection();
  }

  static dropDB() {
    return ServerInitHelper.__dropMongoDB();
  }

  static async __mongoDbConnection() {
    return new Promise((resolve, reject) => {
      mongoose.connect(config.server.db, config.server.dbOptions);

      db.on('error', () => {
        reject('MongoDB connection error');
      });

      db.once('open', () => {
        console.log(`Database connection established: ${config.server.db}`);
        resolve();
      })
    })
  }


  static __closeDbConnection() {
    return new Promise((resolve, reject) => {
      mongoose.connection.close((error) =>{
        if (error) {
          reject(error);
          return;
        }

        console.log('Database connection closed');
        resolve(true);
      })
    })
  }


  static __dropMongoDB() {
    return new Promise((resolve, reject) => {
      mongoose.connection.db.dropDatabase((err) => {
        if (err) {
          reject(err);
        }

        console.log(`Dropping database  ${config.server.db} :( `);
        resolve();
      })
    });
  }
}

module.exports = ServerInitHelper;
