CREATE TABLE Project (
  pid             SERIAL PRIMARY KEY,
  name            TEXT,
  description     TEXT,
  created         BIGINT 
);

CREATE TABLE Procedure (
  cid             SERIAL PRIMARY KEY,
  name            TEXT,
  description     TEXT,
  created         BIGINT,
  pid             INTEGER REFERENCES Project(pid)
);

CREATE TABLE Step (
  sid             SERIAL PRIMARY KEY,
  content         JSON,
  cid             INTEGER REFERENCES Procedure(cid)
);

CREATE OR REPLACE FUNCTION delete_project(targetId INT) 
RETURNS JSON AS $$
DECLARE 
	pp Project%ROWTYPE;
BEGIN
	delete from Step where cid in (select cid from procedure where pid = targetId);
	delete from Procedure where pid = targetId;
	delete from Project where pid = targetId returning * into pp;
  RETURN row_to_json(pp);
END; 
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION delete_procedure(targetId INT)
RETURNS JSON AS $$
DECLARE
	pp Procedure%ROWTYPE;
BEGIN
	delete from Step where cid = targetId;
  delete from Procedure where cid = targetId returning * into pp;
    RETURN row_to_json(pp);
END;
$$ LANGUAGE PLPGSQL
