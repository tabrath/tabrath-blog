#!/usr/bin/env node

const app = require('../');
const port = process.env.PORT || 8080;
const host = process.env.HOST || 'localhost';

app.on('ready', () => {
  app.listen(port, host, (err) => {
    if (err) return console.error(err);

    console.log(`Listening on ${host}:${port}`);
  });
});
