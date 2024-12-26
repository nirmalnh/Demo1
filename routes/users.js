const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Display all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.render('index', { users: results });
    });
});

// Show form for creating a user
router.get('/create', (req, res) => {
    res.render('form', { user: {}, action: 'Create' });
});

// Create a user
router.post('/create', (req, res) => {
    const { name, email, phone_number, dob, gender, bio, summary } = req.body;
    db.query(
        'INSERT INTO users (name, email, phone_number, dob, gender, bio, summary) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, email, phone_number, dob, gender, bio, summary],
        (err) => {
            if (err) throw err;
            res.redirect('/');
        }
    );
});

// Show form for editing a user
// router.get('/edit/:id', (req, res) => {
//     db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, results) => {
//         if (err) throw err;
//         res.render('form', { user: results[0], action: 'Edit' });
//     });
// });



// Update a user
router.post('/edit/:id', (req, res) => {
    const { name, email, phone_number, dob, gender, bio, summary } = req.body;
    db.query(
        'UPDATE users SET name = ?, email = ?, phone_number = ?, dob = ?, gender = ?, bio = ?, summary = ? WHERE id = ?',
        [name, email, phone_number, dob, gender, bio, summary, req.params.id],
        (err) => {
            if (err) throw err;
            res.redirect('/');
        }
    );
});

// Delete a user
router.post('/delete/:id', (req, res) => {
    db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

module.exports = router;
