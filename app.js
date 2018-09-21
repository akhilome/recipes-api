const express = require('express');
const bodyParser = require('body-parser');


const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/recipes', (req, res) => {
  res.send('Making this an API')
});

// Setup Server Port
app.listen(3000, () => console.log('app running on 3000'));
