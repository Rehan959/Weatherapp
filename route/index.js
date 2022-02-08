var express = require("express");
const request = require("request");
var router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", { weather: null, error: null });
});

router.post("/", (req, res) => {
  let city = req.body.city;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=37d99f4c8bd8fa96d4509c54c8a262d7`;

  //making request on api
  request(url, (error, response, body) => {
    if (error) {
      console.log(error);
    } else {
      let weather = JSON.parse(body);
      console.log(weather);
      if (weather.main == undefined) {
        console.log("weather undefined");
      } else {
        let place = `${weather.name}, ${weather.sys.country}`,
          weatherTemp = `${(weather.main.temp - 273.15).toFixed(0)}`,
          weatherDescription = `${weather.weather[0].description}`,
          weatherMin = `${(weather.main.temp_min - 273.15).toFixed(0)}`,
          weatherMax = `${(weather.main.temp_max - 273.15).toFixed(0)}`;
        res.render("index", {
          weather: weather,
          place: place,
          temp: weatherTemp,
          description: weatherDescription,
          max: weatherMax,
          min: weatherMin,
          error: null,
        });
      }
    }
  });
});

module.exports = router;
