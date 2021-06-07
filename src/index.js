//imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./api');

//env config
require('dotenv').config();

// Constant declarations
const PORT = process.env.PORT || 8080;

// Middleware
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routes
app.get('/', (req, res) => {
    res.json({"message": "Server is running"});
});

app.get('/ping', (req, res) => {
    res.json({"data": "pong"});
});

// Routers
app.use('/api/v1', api);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});