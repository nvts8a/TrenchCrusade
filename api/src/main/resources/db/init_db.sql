CREATE DATABASE trench;
CREATE USER crusader WITH PASSWORD 'o3&9PifU' CREATEDB LOGIN;
GRANT ALL ON DATABASE trench TO crusader;
GRANT ALL ON SCHEMA public TO crusader;
GRANT pg_read_server_files TO crusader;
ALTER DATABASE trench OWNER TO crusader;

