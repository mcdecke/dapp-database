// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: `postgresql://localhost/dapp-users-dev`
  },
  test: {
    client: 'pg',
    connection: `postgresql://localhost/dapp-users-env`
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  }
};
