const candlesModel = require('../models/candlesModels');

async function getAll(req, res) {
    const candles = await candlesModel.getAllCandles();
    res.render('pages/index', {candles});
}

async function getOne(req, res) {
    try{
        const candle = await candlesModel.getCandleById(req.params.id);
        if(!candle){
            return res.status(404).send("Nie znaleziono takiej książki")
        }
        res.render('pages/view', { candle });
    }catch{
        res.status(500).send("Błąd servera")
    }
}

function getAddForm(req,res) {
    res.render('pages/add');
}

async function postAdd(req,res) {
    try{
        const {id, name, price, burningTime, description, state} = req.body;

        if (!name || !price || !burningTime || !state){
            return res.status(400).send('Brak wymaganych danych');
        }
        await candlesModel.addCandle(id, name, price, burningTime, description, state);
        res.redirect('/');
    } catch{
        res.status(500).send("Błąd servera")
    }
}


async function getEditForm(req,res) {
    const candle = await candlesModel.getCandleById(req.params.id);
    res.render('pages/edit', {candle});
}

async function postEdit(req,res) {
    try{
        const {id, name, price, burningTime, description, state} = req.body;

        if (!name){
            return res.status(400).send('Nazwa jest wymagana');
        }

        if (isNaN(burningTime)){
            return res.status(400).send('Cena musi być wpisana');
        }

        if (isNaN(burningTime)){
            return res.status(400).send('Czas palenia musi bycć wpisany');
        }


        await candlesModel.updateCandle(req.params.id, name, price, burningTime, description, state);
        res.redirect('/');
    } catch{
        res.status(500).send("Błąd servera")
    }
}

async function deleteCandle(req,res) {
    await candlesModel.deleteCandle(req.params.id);
    res.redirect('/');
}
module.exports = { getAll, getAddForm, postAdd, getEditForm, postEdit, deleteCandle, getOne};