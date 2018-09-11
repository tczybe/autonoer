const router = require('express').Router();
const db = require('../db/postgresdb');
const { procedure } = require('../db/postsql');
const bunyan = require('bunyan');

const logger = bunyan.createLogger({ name: 'logger-customer' });
if (process.env.NODE_ENV === 'test') {
  logger.level(bunyan.FATAL + 1); // set log level to mute logging in testing.
}

router.get('/procedures/:pid', (req, res, next) => {
  const values = [req.params.pid];
  db.query(procedure.get_procedures_from_project, values, (err, result) => {
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

router.post('/procedures/:pid', (req, res, next) => {
  const values = [];
  if (req.body.name && req.body.description) {
    values.push(req.body.name);
    values.push(req.body.description);
    values.push(Date.now());
    values.push(req.params.pid);
  } else {
    res.status(400).end();
    return;
  }
  db.query(procedure.create_a_procedure, values, (err, result) => {
    if (err || result.rowCount === 0) {
      logger.info('creating a procedure failed', { error : err });
      res.status(500).end();
    } else {
      res.status(201);
      res.send(result.rows);
    }
  });
});

router.delete('/procedures/:cid', (req, res, next) => {
  const values = [req.params.cid];
  db.query(procedure.delete_a_procedure, values, (err, result) => {
    if (err) {
      logger.info(err);
      res.status(500).end();
      return;
    }
    res.status(200);
    res.send(result.rows[0]["delete_procedure"]);
  });
});

module.exports = router;