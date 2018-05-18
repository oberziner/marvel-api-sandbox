require('dotenv').config();

const path = require('path');
const express = require('express');
const forward = require('./server/proxy.js')


const app = express();
const port = process.env.PORT || 5000;

app.use('/', express.static(`${__dirname}/build`));

// express will serve up index.html if it doesn't recognize the route
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.get('/__/*', (req, res) => {
  const urlPath = req.originalUrl.substring(3);
  forward(urlPath, res);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
