const { Pool } = require('pg');
const { configDev, configTest } = require('./postsql');
const bunyan = require('bunyan');

const logger = bunyan.createLogger({ name: 'logger-postgresdb' });
let pool;
if (process.env.NODE_ENV !== 'test') {
  pool = new Pool(configDev);
} else {
  pool = new Pool(configTest);
  logger.level(bunyan.FATAL + 1); // set log level to mute logging when running tests.
}

module.exports = {
  query: (text, params, callback) => {
    logger.info('Operating against db...', {
      query: text,
      parameters: params
    });
    // const start = Date.now();
    pool.query(text, params, (err, res) => {
      // const duration = Date.now() - start;
      // console.log('executed query', { text, duration, rows: res.rowCount });
      callback(err, res);
    });
  }
};