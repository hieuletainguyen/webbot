const sqlStatement = [];
sqlStatement.push(`
    SELECT 'CREATE DATABASE robot_accounts' 
    WHERE NOT EXISTS (SELECT FROM pg_database where datname = 'robot_accounts');

    \c robot_accounts;

    CREATE TABLE IF NOT EXISTS accounts(
        id int AUTO_INCREMENT,
        username VARCHAR(50), 
        password VARCHAR(200),
        PRIMARY KEY (id)
    );

    CREATE TABLE IF NOT EXISTS tokens (
        id int AUTO_INCREMENT,
        token VARCHAR(200),
        PRIMARY KEY (id)
    )

    CREATE TABLE IF NOT EXISTS image (
        id int AUTO_INCREMENT,
        username VARCHAR(50),
        image BYTEA NOT NULL, 
        time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )

    CREATE TABLE IF NOT EXISTS video (
        id int AUTO_INCREMENT,
        username VARCHAR(50),
        video BYTEA NOT NULL,
        time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
`);

