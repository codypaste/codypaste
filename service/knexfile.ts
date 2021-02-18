export default {
  development: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST || 'localhost',
      user: 'postgres',
      password: 'postgres',
      database: 'codypaste-develop',
    },
    migrations: {
      directory: 'src/database/migrations',
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
      directory: 'src/database/migrations',
    },
  },
};
