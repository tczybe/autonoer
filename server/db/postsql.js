module.exports = {
  configDev: {
    user: 'postgres',
    host: 'localhost',
    database: 'autonoer',
    password: 'admin',
    port: 5432,
  },
  configTest: {
    user: 'postgres',
    host: 'localhost',
    database: 'autonoer_test',
    password: 'admin',
    port: 5432,
  },
  project: {
    get_all_projects: 'SELECT * FROM Project;',
    create_a_project: 'INSERT INTO Project (name, description, created) VALUES ($1, $2, $3) RETURNING *;',
    delete_a_project: 'SELECT delete_project($1);'
  },
  procedure: {
    get_procedures_from_project: 'SELECT * FROM Procedure WHERE pid = $1;',
    create_a_procedure: 'INSERT INTO Procedure (name, description, created, pid) VALUES ($1, $2, $3, $4) RETURNING *;',
    delete_a_procedure: 'SELECT delete_procedure($1);'
  },
  step: {
    get_steps_from_procedure: 'SELECT * FROM Step WHERE cid = $1;',
    create_a_step: 'INSERT INTO Step (content, cid) VALUES ($1, $2) RETURNING *;',
    delete_a_step: 'DELETE FROM Step WHERE sid = $1 RETURNING *;'
  }
};