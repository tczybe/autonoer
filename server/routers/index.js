const project = require('./project');
const procedure = require('./procedure');
const step = require('./step');

module.exports = (app) => {
  app.use(project);
  app.use(procedure);
  app.use(step);
};