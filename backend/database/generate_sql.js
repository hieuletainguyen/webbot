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

    CREATE TABLE IF NOT EXISTS images (
        id SERIAL PRIMARY KEY, 
        filename VARCHAR(50), 
        date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        blob_data OID,
    );

    CREATE TABLE IF NOT EXISTS tokens (
        id int AUTO_INCREMENT,
        token VARCHAR(200),
        PRIMARY KEY (id)
    )
`);

