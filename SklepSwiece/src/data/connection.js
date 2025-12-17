const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
 
let db;

async function connectDB() {
    try {
        await client.connect();
        db = await client.db('candles');
        console.log('Połączono z MongoDB');
    } catch (err){
        console.error('Błąd połączenia: ', err);
    }
}

function getDB() {
    if(!db) throw new Error('Baza danych nie podłączona');
    return db;
}

module.exports = { connectDB, getDB };