'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mun');

let app = express();

app.use(bodyParser.urlencoded({extended: true})); // support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(cors());

app.set('mongoose', mongoose);

const LISTEN_PORT = 3000;

let api = require('./controllers/v1.js');
app.get('/v1/service-codes', api.getServiceCodes);
app.get('/v1/services', api.getServices);
app.get('/v1/areas', api.getAreas);

app.listen(LISTEN_PORT, () => {
    console.log('Listening on port ' + LISTEN_PORT);
});
