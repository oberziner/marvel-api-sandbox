const path = require('path');
const express = require('express');
const forward = require('./server/proxy.js')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use('/', express.static(`${__dirname}/build`));

// express will serve up index.html if it doesn't recognize the route
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.get('/__/hello', (req, res) => {
  res.send({ express: 'Mostly harmless' });
});

app.get('/__/apitest', (req, res) => {
  forward(res);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
