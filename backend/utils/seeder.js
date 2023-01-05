var seeder = require('../modals/regions');

const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const seedData = async () => {

  try {
    // await seeder.saveCountries();
    // await seeder.saveStates();
    // await seeder.saveCities();
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedData();
