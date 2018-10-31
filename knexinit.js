knex = require('knex') ({   
    client: 'mysql2',
    connection : {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'expenses_schema'
    }
});

module.exports = knex;