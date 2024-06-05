CREATE DATABASE trench;
CREATE USER crusader WITH PASSWORD 'f&&M2HuxgHnBTw8' CREATEDB LOGIN;
GRANT pg_read_server_files TO crusader;
GRANT ALL ON DATABASE trench TO crusader;
GRANT ALL ON SCHEMA public TO crusader;
ALTER DATABASE trench OWNER TO crusader;