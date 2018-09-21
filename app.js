const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cons = require('consolidate');
const dust = require('dustjs-helpers');
const pg = require('pg');

const app = express();

// DB connection string 
const connect = "postgres://postgres:/localhost/recipebookdb";

// Assign dust engine to .dust files
app.engine('dust', cons.dust);

// Set default ext to .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

// Set Public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

// Setup Server Port
app.listen(3000, () => console.log('app running on 3000'));
