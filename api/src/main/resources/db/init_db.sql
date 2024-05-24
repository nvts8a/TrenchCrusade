CREATE DATABASE trench;
CREATE USER crusader WITH PASSWORD 'o3&9PifU' CREATEDB LOGIN;
GRANT pg_read_server_files TO crusader;

GRANT ALL ON DATABASE trench TO crusader;
GRANT ALL ON SCHEMA public TO crusader;
ALTER DATABASE trench OWNER TO crusader;

