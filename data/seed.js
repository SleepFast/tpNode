// seed.js
const { faker } = require('@faker-js/faker');
const db = require('../config/db');
const Bars = require('../models/Bars');
const Biere = require('../models/Biere');
const Commande = require('../models/Commande');
const Biere_commande = require('../models/Biere_commande');

const generateBars = async (num) => {
  const bars = [];
  for (let i = 0; i < num; i++) {
    bars.push({
      name: faker.company.name(),
      adresse: faker.address.streetAddress(),
      tel: faker.phone.number('##########'), // Generate a 10-digit phone number
      description: faker.lorem.sentence(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  }
  await Bars.bulkCreate(bars);
  console.log(`${num} bars created`);
  return await Bars.findAll();
};

const generateBieres = async (num, bars) => {
  const bieres = [];
  for (let i = 0; i < num; i++) {
    bieres.push({
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      degree: faker.datatype.float({ min: 3, max: 12, precision: 0.1 }),
      prix: faker.datatype.float({ min: 1, max: 100, precision: 0.01 }),
      barsId: faker.helpers.arrayElement(bars).id,
    });
  }
  await Biere.bulkCreate(bieres);
  console.log(`${num} bieres created`);
  return await Biere.findAll();
};

const generateCommandes = async (num, bars) => {
  const commandes = [];
  for (let i = 0; i < num; i++) {
    commandes.push({
      name: faker.commerce.productName(),
      prix: faker.datatype.float({ min: 1, max: 1000, precision: 0.01 }),
      date: faker.date.past(),
      status: faker.helpers.arrayElement(['en cours', 'terminée']),
      barsId: faker.helpers.arrayElement(bars).id,
    });
  }
  await Commande.bulkCreate(commandes);
  console.log(`${num} commandes created`);
  return await Commande.findAll();
};

const generateBiereCommandes = async (num, bieres, commandes) => {
  const biereCommandes = [];
  for (let i = 0; i < num; i++) {
    biereCommandes.push({
      biere_id: faker.helpers.arrayElement(bieres).id,
      commande_id: faker.helpers.arrayElement(commandes).id,
    });
  }
  await Biere_commande.bulkCreate(biereCommandes);
  console.log(`${num} biereCommandes created`);
};

const seed = async () => {
  try {
    await db.sync({ alter: true }); // This will alter tables instead of dropping them
    console.log('Database synchronized');

    const bars = await generateBars(10);
    const bieres = await generateBieres(50, bars);
    const commandes = await generateCommandes(30, bars);
    await generateBiereCommandes(100, bieres, commandes);

    console.log('Seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit();
  }
};

module.exports = seed;