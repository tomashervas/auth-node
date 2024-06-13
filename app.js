const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
const authenticateToken = require('./authMiddleware');

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/auth', authRoutes);

app.get('/protected', authenticateToken, (req, res) => {
    res.json({ user: req.user });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});