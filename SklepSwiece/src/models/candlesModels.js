const { ObjectId } = require('mongodb');
const { getDB } = require('../data/connection');

async function getAllCandles() {
    const db = getDB();
    return await db.collection('candles').find().sort({ year: 1 }).toArray();
}

async function getCandleById(id) {
    const db = getDB();
    return await db.collection('candles').findOne({ _id: new ObjectId(id) });
}

async function addCandle(id, name, price, burningTime, description, state) {
    const db = getDB();
    await db.collection('candles').insertOne({id, name, price, burningTime, description, state});
}

async function updateCandle(id, name, price, burningTime, description, state) {
    const db = getDB();
    await db.collection('candles').updateOne(
        {_id: new ObjectId(id) },
        { $set: {name, price, burningTime, description, state} }
    );
}

async function deleteCandle(id) {
    const db = getDB();
    await db.collection('candles').deleteOne({ _id: new ObjectId(id)})
}

module.exports = {getAllCandles, getCandleById, addCandle, updateCandle, deleteCandle};