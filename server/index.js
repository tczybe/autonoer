const express = require('express');
const routerMount = require('./routers');
const bodyPaser = require('body-parser');
const app = express();

app.use(bodyPaser.json());
routerMount(app);
app.listen(8888, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Autonoer running on port 8888...');
});

module.exports = app;