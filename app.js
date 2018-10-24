const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const passport  = require('passport');

mongoose.connect(config.database, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log('connected to database'+config.database)
})

mongoose.connection.on('error', (err) => {
    console.log('Database error'+err)
})

const app = express();

const users = require('./routes/users');

const port = 3002;

//Middleware
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users',users)

app.get('/', (req, res) => {
    res.send('Invalid');
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(port, () => {
console.log('Server started on port'+port);
})