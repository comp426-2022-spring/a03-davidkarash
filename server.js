import express from 'express';
import http from 'http';
import min from 'minimist';
import { coinFlip, coinFlips, countFlips, flipACoin } from './coin.mjs';
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
    res.json({'flip': coinFlip()})
})
app.get('/app/flips/:number', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    let results = coinFlips(req.params.number)
    res.json({'raw':results,'summary':countFlips(results)})
})
app.get('/app/flip/call/:call', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK'
    if (req.params.call == 'heads') {
        res.json(flipACoin('heads'));
    } else if (req.params.call == 'tails') {
        res.json(flipACoin('tails'));
    } else {
        res.status(404).send('404 NOT FOUND');
    }
})
// Default response for any invalid request
app.use(function(req, res) {
    res.status(404).send('404 NOT FOUND');
})