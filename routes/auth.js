const express = require('express');
require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken');

const users =  [{username: process.env.USERNAME, email: process.env.EMAIL, password: process.env.PASSWORD}];

router.post('/login', (req, res) => {
    const { username, email, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ username, email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });
        res.json({ token, username, email });
    } else {
        res.sendStatus(401).json({ message: 'Invalid username or password' });
    }
});

module.exports = router;