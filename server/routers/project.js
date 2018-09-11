const router = require('express').Router();
const db = require('../db/postgresdb');
const { project } = require('../db/postsql');
const bunyan = require('bunyan');

const logger = bunyan.createLogger({ name: 'logger-project'});
if (process.env.NODE_ENV === 'test') {
  logger.level(bunyan.FATAL + 1);
}

router.get('/projects/', (req, res, next) => {
  db.query(project.get_all_projects, null, (err, result) => {
    if (err) {
      logger.info(err);
      res.status(500).end();
      return;
    }
    if (result.rowCount === 0) {
      res.status(204).end();
      return;
    }
    res.status(200);
    res.send(result.rows);
  });
});

router.post('/projects/', (req, res, next) => {
  const values = [];
  if (req.body.name && req.body.description) {
    values.push(req.body.name);
    values.push(req.body.description);
    values.push(Date.now());
  } else {
    res.status(400).end();
    return;
  }
  db.query(project.create_a_project, values, (err, result) => {
    if (err || result.rowCount === 0) {
      logger.info('creating a project failed', { error: err });
      res.status(500).end();
    } else {
      res.status(201);
      res.send(result.rows);
    }
  });
});

router.delete('/projects/:pid', (req, res, next) => {
  const values = [req.params.pid];
  db.query(project.delete_a_project, values, (err, result) => {
    if (err) {
      logger.info(err);
      res.status(500).end();
      return;
    }
    res.status(200);
    res.send(result.rows[0]["delete_project"]);
  });
});

module.exports = router;