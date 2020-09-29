module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'postgres',
      user: 'postgres',
      password: 'postgres',
      database: 'codypaste-develop',
    },
    migrations: {
      directory: 'database/migrations',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'database/migrations',
    },
  },
};
