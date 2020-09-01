var express = require("express");
// var path = require("path");
var app = express();
var PORT = process.env.PORT || 8080;

var bodyParser = require("body-parser")

var scraper = require("./scraper")

app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
})

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public/"));

// Routes
// =============================================================

app.post("/npm-packages", async (req, res)=> {
  const packageSearchResults = await scraper.npmScraper(
    await JSON.stringify(req.body.packageSearch)
  );
  console.log(packageSearchResults);
  await res.send(packageSearchResults);
});

// Syncing our sequelize models and then starting our Express app
// =============================================================

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
