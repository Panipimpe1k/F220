const candlesModel = require('../models/candlesModels');

async function getAll(req, res) {
    try {
        const candles = await candlesModel.getAllCandles();
        res.render('pages/index', { candles });
    } catch {
        res.status(500).render('pages/error', { message: 'Błąd serwera' });
    }
}

async function getOne(req, res) {
    try {
        const candle = await candlesModel.getCandleById(req.params.id);
        if (!candle) {
            return res.status(404).render('pages/error', { message: 'Nie znaleziono świecy' });
        }
        const candles = await candlesModel.getAllCandles();
        res.render('pages/view', { candle, candles });
    } catch {
        res.status(500).render('pages/error', { message: 'Błąd serwera' });
    }
}

async function getAddForm(req, res) {
    try {
        const candles = await candlesModel.getAllCandles();
        res.render('pages/add', { candles });
    } catch {
        res.status(500).render('pages/error', { message: 'Błąd serwera' });
    }
}

async function postAdd(req, res) {
    try {
        const { name, price, burningTime, description, state } = req.body;

        if (!name || !price || !burningTime || !state) {
            return res.status(400).render('pages/error', { message: 'Brak wymaganych danych' });
        }
        if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
            return res.status(400).render('pages/error', { message: 'Nazwa musi mieć od 2 do 100 znaków' });
        }
        if (isNaN(price) || Number(price) <= 0) {
            return res.status(400).render('pages/error', { message: 'Cena musi być liczbą większą od 0' });
        }
        if (isNaN(burningTime) || Number(burningTime) <= 0) {
            return res.status(400).render('pages/error', { message: 'Czas palenia musi być liczbą większą od 0' });
        }
        if (!['available', 'out of order'].includes(state)) {
            return res.status(400).render('pages/error', { message: 'Nieprawidłowy status' });
        }

        await candlesModel.addCandle(name.trim(), Number(price), Number(burningTime), description.trim(), state);
        res.redirect('/');
    } catch {
        res.status(500).render('pages/error', { message: 'Błąd serwera' });
    }
}

async function getEditForm(req, res) {
    try {
        const candle = await candlesModel.getCandleById(req.params.id);
        if (!candle) {
            return res.status(404).render('pages/error', { message: 'Nie znaleziono świecy' });
        }
        const candles = await candlesModel.getAllCandles();
        res.render('pages/edit', { candle, candles });
    } catch {
        res.status(500).render('pages/error', { message: 'Błąd serwera' });
    }
}

async function postEdit(req, res) {
    try {
        const { name, price, burningTime, description, state } = req.body;

        if (!name || name.trim().length < 2 || name.trim().length > 100) {
            return res.status(400).render('pages/error', { message: 'Nazwa musi mieć od 2 do 100 znaków' });
        }
        if (isNaN(price) || Number(price) <= 0) {
            return res.status(400).render('pages/error', { message: 'Cena musi być liczbą większą od 0' });
        }
        if (isNaN(burningTime) || Number(burningTime) <= 0) {
            return res.status(400).render('pages/error', { message: 'Czas palenia musi być liczbą większą od 0' });
        }
        if (!['available', 'out of order'].includes(state)) {
            return res.status(400).render('pages/error', { message: 'Nieprawidłowy status' });
        }

        await candlesModel.updateCandle(req.params.id, name.trim(), Number(price), Number(burningTime), description.trim(), state);
        res.redirect('/');
    } catch {
        res.status(500).render('pages/error', { message: 'Błąd serwera' });
    }
}

async function deleteCandle(req, res) {
    try {
        await candlesModel.deleteCandle(req.params.id);
        res.redirect('/');
    } catch {
        res.status(500).render('pages/error', { message: 'Błąd serwera' });
    }
}

module.exports = { getAll, getAddForm, postAdd, getEditForm, postEdit, deleteCandle, getOne };