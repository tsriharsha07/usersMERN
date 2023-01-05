const express = require("express");
const router = express.Router();

const {
  getCountries,
  getStates,
  getCities,
  getSingleCountry,
  getSinglestate,
} = require("../controllers/regionController");

router.route("/countries").get(getCountries);

router.route("/countries/:countryid").get(getSingleCountry);

router.route("/states/:countryid").get(getStates);

router.route("/country/states/:stateid").get(getSinglestate);

router.route("/cities/:stateid").get(getCities);

module.exports = router;
