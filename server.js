/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
const express = require('express');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const swaggerDocument = require('./swagger/swagger.json');
// create express app
const app = express();
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// parse requests of content-type - application/json
app.use(express.json());

// Configuring the database
const dbConfig = require('./config/database.config.js');

// Connecting to the database
dbConfig.connection();
// define a simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to fundooNotes application. Take notes quickly. Organize and keep track of all your notes.' });
});
// Require Notes routes
require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(process.env.PORT, () => {
  console.log('Server is listening');
});
module.exports = app;
