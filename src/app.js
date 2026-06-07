const express = require('express');
const path = require('path');
const candlesRouter = require('./routes/candlesRouter');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', candlesRouter);

app.use((req, res) => {
    res.status(404).render('pages/error', { message: 'Strona nie została znaleziona' });
});

app.use((err, req, res, next) => {
    res.status(500).render('pages/error', { message: 'Wewnętrzny błąd serwera' });
});

module.exports = app;