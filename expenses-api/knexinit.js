var config = require('config');

knex = require('knex') ({   
    client: 'mysql2',
    connection : config.get('api.dbConfig')
});

module.exports = knex;