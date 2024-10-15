const express = require('express');
const app = express();
const request = require('request');

const port = process.env.PORT || 3000; 

const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

app.get('/', (req, res) => {
    res.send("Home");
});

//uses polygon.io (limit 5 calls per minute)
app.get('/ticker/:ticker', (req, res) => {
    const ticker = req.params.ticker;
    const key = '___';
    console.log("getting: " + ticker);
    
    const fromDate = `${year}-${month}-${day}`;
    const currentDate = `${year}-${month}-${day}`;
    console.log(fromDate, 'through', currentDate);
    
    request.get({
        url: `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${fromDate}/${currentDate}?adjusted=true&sort=asc&apiKey=${key}`,
        json: true,
        headers: { 'User-Agent': 'request' }
    }, (err, apiRes, data) => {
        if (err) {
            console.log('Error:', err);
            res.status(500).send('Error occurred');
        } else if (apiRes.statusCode !== 200) {
            console.log('Status:', apiRes.statusCode);
            res.status(apiRes.statusCode).send('Failed to fetch data');
        } else {
            console.log('returned: ', data);
            res.json(data);
        }
    });
});

//uses alphavantage.co (limit 25 queries per day)
app.get('/search/:value', (req, res) => {
    const value = req.params.value;
    const key = '___';
    console.log("searching for: " + value);

    request.get({
        url: `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${key}`,
        json: true,
        headers: {'User-Agent': 'request'}
    }, (err, apiRes, data) => {
        if (err) {
            console.log('Error:', err);
            res.status(500).send('Error occurred');
        } else if (apiRes.statusCode !== 200) {
            console.log('Status:', apiRes.statusCode);
            res.status(apiRes.statusCode).send('Failed to fetch data');
        } else {
            res.json(data);
        }
    });
});

app.post('/post', (req, res) => {
  res.send('post template');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});