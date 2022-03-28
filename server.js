const express = require('express');
const http = require('http');
const min = require('minimist');
const coin = require('./coin.js');
const app = express();
const port = min(process.argv.slice(2))['port'] || 5000
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
})
app.get('/app/', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
})
app.get('/app/flip/', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.json({'flip': coin.coinFlip()})
})
app.get('/app/flips/:number', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    results = coin.coinFlips(req.params.number)
    res.json({'raw':results,'summary':coin.countFlips(results)})
})
app.get('/app/flip/call/:call', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK'
    if (req.params.call == 'heads') {
        res.json(coin.flipACoin('heads'));
    } else if (req.params.call == 'tails') {
        res.json(coin.flipACoin('tails'));
    } else {
        res.status(404).send('404 NOT FOUND');
    }
})
// Default response for any invalid request
app.use(function(req, res) {
    res.status(404).send('404 NOT FOUND');
})