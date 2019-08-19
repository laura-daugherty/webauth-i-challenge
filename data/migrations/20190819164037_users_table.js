
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments()
      tbl.
    })
};

exports.down = function(knex) {
  
};
