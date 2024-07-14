// sequelize.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // SQLite database file
  logging: false, // Disable logging
});

// Sync all defined models to the database
sequelize.sync({ force: false }) // Set force to true to drop existing tables and re-create them
  .then(() => {
    console.log('Database synchronized successfully');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });
module.exports = sequelize;
