exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del().then(function() {
    // Inserts seed entries
    return knex('users').insert([
      {
        id: 1,
        email: 'Criminal',
        hashedPass: 'What Are You?'
      }, {
        id: 2,
        email: 'Batman',
        hashedPass: 'SEEEEDS'
      }
    ]).then(() => {
      return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`)
    });
  });
};
