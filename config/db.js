const { Sequelize } = require('@sequelize/core');
const { MariaDbDialect } = require('@sequelize/mariadb');

const db = new Sequelize({
  dialect: MariaDbDialect,
  database: 'KANBAN',
  user: 'root',  // Notez que 'username' est utilisé à la place de 'user'
  password: 'password',
  host: 'localhost',
  port: 3306,
  logging: console.log,
  showWarnings: true,
  connectTimeout: 1000,
});


db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    // Synchronisez les modèles
    return db.sync();
  })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;