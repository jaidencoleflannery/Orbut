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
    
    const fromDate = `${year}-${month}-${day-1}`;
    const currentDate = `${year}-${month}-${day}`;
    console.log(fromDate, 'through', currentDate);

    //fake response to avoid API limits
    const data = JSON.parse('{"ticker":"NVDA","queryCount":1,"resultsCount":1,"adjusted":true,"results":[{"v":224602526,"vw":138.3656,"o":136.47,"c":138.07,"h":139.6,"l":136.3,"t":1728878400000,"n":1590531}],"status":"DELAYED","request_id":"02e6f747fd361a9178f09169e300452d","count":1}');
    res.json(data);
    
    //actual API pull here
    /*
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
    */
});

/*
/ticker/:ticker returns a JSON object in format:
{
  "ticker": "The exchange symbol that this item is traded under",
  "queryCount": The number of aggregates (minute or day) used to generate the response,
  "resultsCount": The total number of results for this request,
  "adjusted": Whether or not this response was adjusted for splits,
  "results": [
    {
      "v": The trading volume of the symbol in the given time period,
      "vw": The volume weighted average price,
      "o": The open price for the symbol in the given time period,
      "c": The close price for the symbol in the given time period,
      "h": The open price for the symbol in the given time period.
      "l": 136.3,
      "t": The Unix Msec timestamp for the start of the aggregate window,
      "n": The number of transactions in the aggregate window.
    }
  ],
  "status": "The status of this request's response",
  "request_id": "A request id assigned by the server",
  "count": quantity.
}
*/

//uses alphavantage.co (limit 25 queries per day)
app.get('/search/:value', (req, res) => {
    const value = req.params.value;
    const key = '___';
    console.log("searching for: " + value);

    //fake response to avoid API limits
    const exampleObject = '{"bestMatches":[{"1. symbol":"TSCO.LON","2. name":"Tesco PLC","3. type":"Equity","4. region":"United Kingdom","5. marketOpen":"08:00","6. marketClose":"16:30","7. timezone":"UTC+01","8. currency":"GBX","9. matchScore":"0.7273"},{"1. symbol":"TSCDF","2. name":"Tesco plc","3. type":"Equity","4. region":"United States","5. marketOpen":"09:30","6. marketClose":"16:00","7. timezone":"UTC-04","8. currency":"USD","9. matchScore":"0.7143"}]}';
        data = JSON.parse(exampleObject);
    res.json(data);

    //actual API pull here
    /*
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
    */
});

/*
/search/:value (for example value 'tesco')returns a JSON object in format:
{
    "bestMatches": [
        {
            "1. symbol": "TSCO.LON",
            "2. name": "Tesco PLC",
            "3. type": "Equity",
            "4. region": "United Kingdom",
            "5. marketOpen": "08:00",
            "6. marketClose": "16:30",
            "7. timezone": "UTC+01",
            "8. currency": "GBX",
            "9. matchScore": "0.7273"
        },
    ]
}
*/

app.post('/post', (req, res) => {
  res.send('post template');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});