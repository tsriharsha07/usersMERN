const CountryJson = require("../data/countries.json");
const StateJson = require("../data/states.json");
const CityJson = require("../data/cities.json");

exports.getCountries = async (req, res, next) => {
  res.status(200).json({
    success: true,
    CountryJson,
  });
};

exports.getSingleCountry = async (req, res, next) => {
  let singleCountry = [];
  await CountryJson.map((country) => {
    if (country._id == req.params.countryid) {
      singleCountry.push(country);
    }
  });

  res.status(200).json({
    success: true,
    singleCountry,
  });
};

let countryStates = [];

exports.getStates = async (req, res, next) => {
  countryStates = [];
  await StateJson.map((state) => {
    if (state.country == req.params.countryid) {
      countryStates.push(state);
    }
  });
  res.status(200).json({
    success: true,
    count: countryStates.length,
    countryStates,
  });
};

exports.getSinglestate = async (req, res, next) => {
  let singleState = [];
  if (countryStates.length) {
    await countryStates.map((state) => {
      if (state._id == req.params.stateid) {
        singleState.push(state);
      }
    });
  }

  res.status(200).json({
    success: true,
    singleState,
  });
};

exports.getCities = async (req, res, next) => {
  let stateCities = [];
  await CityJson.map((city) => {
    if (city.state == req.params.stateid) {
      stateCities.push(city);
    }
  });
  res.status(200).json({
    success: true,
    count: stateCities.length,
    stateCities,
  });
};
