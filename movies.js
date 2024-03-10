var express = require('express')
const pool = require('./queries')
var router = express.Router()


router.get('/', (req,res) => {
    pool.query('SELECT * FROM movies', (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows)
    })
})


router.get('/:id', (req, res) => {
    let moviesId = `SELECT * FROM movies WHERE id=${req.params.id}`;
    pool.query(moviesId, (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows)
    })
})


router.post('/', (req, res) => {
    const { id, title, genres, year } = req.body;
    let sql = 'INSERT INTO movies (id, title, genres, year) VALUES ($1, $2, $3, $4) RETURNING *';
    pool.query(sql, [id, title, genres, year], (err, result) => {
        if (err) {
            throw err;
        }
        res.json({ message: 'Movie added successfully' });
    });
});


router.delete('/:id', (req, res) => {
    const delID = req.params.id;
    let sql = 'DELETE FROM movies WHERE id = $1';
    pool.query(sql, [delID], (err, result) => {
        if (err) {
            throw err;
        }
        res.json({ message: 'Movie deleted successfully' });
    });
});

router.put('/:id', (req, res) => {
    const putId = req.params.id;
    const newTitle = req.body.title;
    let sql = 'UPDATE movies SET title = $1 WHERE id = $2';
    pool.query(sql, [newTitle, putId], (err, result) => {
        if (err) {
            throw err;
        }
        res.json({ message: 'Movie updated successfully' });
    });
});




module.exports = router