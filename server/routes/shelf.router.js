const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  pool
    .query(`SELECT * FROM "item";`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in GETTING shelf items', error);
      res.sendStatus(500);
    });

  // res.sendStatus(200); // For testing only, can be removed
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, async (req, res) => {
  console.log('In post item');
  try {
    const result = await pool.query(
      `INSERT INTO "item" ("description", "user_id", "image_url") VALUES ($1, $2, $3) RETURNING *;`,
      [req.body.description, req.user.id, req.body.image_url]
    );
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('check req.user.id', req.user.id);
  // endpoint functionality
  const queryText = `DELETE FROM "item" WHERE "user_id"=$1;`;
  pool
    .query(queryText, [req.user.id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error deleting item', error);
      res.sendStatus(500);
    });
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
