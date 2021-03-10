const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const config = require('./constants/config');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'client', 'build')));

require('./middlewares/passportmw')(passport);

const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const main = async() => {
    try {
        await mongoose.connect(config.DB_CON, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => console.log('connected'));
        app.listen(config.APP_PORT, () => console.log(`Server runs on server: ${config.APP_PORT}`));
    } catch (err) {
        throw err;
    }
};

main();

