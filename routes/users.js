// var express = require('express');
// var router = express.Router();
//
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// module.exports = router;



'use strict';

const express = require('express');
const knex = require('../knex')
const humps = require('humps')

const router = express.Router();

// YOUR CODE HERE

router.get('/', (req, res, next) => {
  console.log('at users');
  knex('users')
    .orderBy('id')
    .then((x) => {
      let myobj = humps.camelizeKeys(x)
      console.log('get sends back', myobj);
      res.json(myobj)
      // res.render('users', { users: myobj});
    })
    .catch((err => {
      next(err)
    }))

})

router.get('/:id', (req, res, next) => {
  knex('users')
    .where('id', req.params.id)
    .then((x) => {
      let myobj = humps.camelizeKeys(x[0])
      console.log('get sends back', myobj);
      // res.json(humps.camelizeKeys(x[0]))
      res.render('hashedPass', { hashedPass: myobj});
    })
    .catch((err => {
      next(err)
    }))
})

router.post('/', (req, res, next) => {
  knex('users')
    .insert(humps.decamelizeKeys({
      "email": req.body.email,
      "hashedPass": req.body.hashedPass
    }))
    .returning('*')
    .then((data) => {
      res.json(humps.camelizeKeys(data[0]))
    })
    .catch((err) => {
      console.log(err);
      next(err)
    })
})

router.patch('/:id', (req, res, next) => {
  knex('users')
    .where('id', req.params.id)
    .then((data) => {
      knex('users')
        .where('id', req.params.id)
        .limit(1)
        .update(humps.decamelizeKeys({
          "email": req.body.email,
          "hashedPass": req.body.hashedPass
        }))
        .returning('*')
        .then((data) => {
          res.json(humps.camelizeKeys(data[0]))
        })
    })
    .catch((err) => {
      next(err)
    })
})

router.delete('/:id', (req, res, next) => {
  knex('users')
    .where('id', req.params.id)
    .first()
    .then((x) => {
      if (!x) return next()
      knex('users')
        .del()
        .where('id', req.params.id)
        .then(() => {
          console.log(x);
          res.json(humps.camelizeKeys(x))
        })
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router;
