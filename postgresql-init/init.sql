
    DO $$
    BEGIN
        IF NOT EXISTS (
            SELECT FROM pg_database 
            WHERE datname = 'robot_accounts'
        ) THEN
            PERFORM dblink_exec('dbname=postgres', 'CREATE DATABASE robot_accounts');
        END IF;
    END $$;

    \c robot_accounts;
    

    CREATE TABLE IF NOT EXISTS accounts(
        id SERIAL,
        username VARCHAR(50), 
        password VARCHAR(200),
        PRIMARY KEY (id)
    );

    CREATE TABLE IF NOT EXISTS tokens (
        id SERIAL,
        token VARCHAR(3000),
        PRIMARY KEY (id)
    );

    CREATE TABLE IF NOT EXISTS images (
        id SERIAL,
        username VARCHAR(50),
        image BYTEA NOT NULL, 
        time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS video (
        id SERIAL,
        username VARCHAR(50) NOT NULL,
        video BYTEA NOT NULL,
        time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS booking_schedule (
        id SERIAL,
        username VARCHAR(100) NOT NULL,
        date DATE NOT NULL, 
        time VARCHAR(50) NOT NULL,
        robot_option VARCHAR(100) NOT NULL,
        PRIMARY KEY (id)
    );

