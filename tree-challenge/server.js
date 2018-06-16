const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));

// CONFIG: Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// If no API routes are hit, send the React app
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});


// CONFIG: Database
const db = require('./models');
const PORT = process.env.PORT || 3001;
db.sequelize.sync().then(() =>
  app.listen(PORT, () => console.log(`Server Listening on Port ${PORT}`))
);