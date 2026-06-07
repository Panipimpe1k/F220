const { ObjectId } = require('mongodb');
const crypto = require('crypto');
const { getDB } = require('../data/connection');

function hashDescription(text) {
    return crypto.createHash('sha256').update(text || '').digest('hex');
}

async function getAllCandles() {
    const db = getDB();
    return await db.collection('candles').find().sort({ name: 1 }).toArray();
}

async function getCandleById(id) {
    const db = getDB();
    return await db.collection('candles').findOne({ _id: new ObjectId(id) });
}

async function addCandle(name, price, burningTime, description, state) {
    const db = getDB();
    const descriptionHash = hashDescription(description);
    await db.collection('candles').insertOne({ name, price, burningTime, description, descriptionHash, state });
}

async function updateCandle(id, name, price, burningTime, description, state) {
    const db = getDB();
    const descriptionHash = hashDescription(description);
    await db.collection('candles').updateOne(
        { _id: new ObjectId(id) },
        { $set: { name, price, burningTime, description, descriptionHash, state } }
    );
}

async function deleteCandle(id) {
    const db = getDB();
    await db.collection('candles').deleteOne({ _id: new ObjectId(id) });
}

module.exports = { getAllCandles, getCandleById, addCandle, updateCandle, deleteCandle };