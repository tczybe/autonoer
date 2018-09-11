const router = require('express').Router();
const db = require('../db/postgresdb');
const { step } = require('../db/postsql');
const bunyan = require('bunyan');

const logger = bunyan.createLogger({ name: 'logger-project'});
if (process.env.NODE_ENV === 'test') {
  logger.level(bunyan.FATAL + 1);
}

router.get('/steps/:cid', (req, res, next) => {
  const values = [req.params.cid];
  db.query(step.get_steps_from_procedure, values, (err, result) => {
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

router.post('/steps/:cid', (req, res, next) => {
  const values = [];
  if (req.body.content) {
    values.push(req.body.content);
    values.push(req.params.cid);
  } else {
    res.status(400).end();
    return;
  }
  db.query(step.create_a_step, values, (err, result) => {
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

router.delete('/steps/:sid', (req, res, next) => {
  const values = [req.params.sid];
  db.query(step.delete_a_step, values, (err, result) => {
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

module.exports = router;