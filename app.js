const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const userRoutes = require('./routes/users');
const moment = require('moment');
const path = require('path');

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as view engine
app.set('view engine', 'ejs');

// Routes
app.use('/users', userRoutes);
app.get('/', (req, res) => res.redirect('/users'));

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
