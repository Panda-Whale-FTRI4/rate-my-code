const { Pool } = require('pg');
require('dotenv').config();

// const PG_URI =
//   'postgres:tcoracmx:jLjTGxXlr8tpUu-Ipx79pPfkko6lZayD@kashin.db.elephantsql.com/tcoracmx';

const PG_URI = process.env.DB_URL;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
