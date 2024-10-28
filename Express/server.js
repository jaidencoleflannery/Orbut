const express = require('express');
const app = express();
const request = require('request');
const cors = require('cors');
const port = process.env.PORT || 3000; 

app.use(cors({
    origin: 'http://localhost:4200'
  }));

const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

app.get('/', (req, res) => {
    res.send("Home");
});

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

app.get('/search/:value', (req, res) => {
    const value = req.params.value;
    const key = '___';
    console.log("searching for: " + value);

    //fake response to avoid API limits
    const exampleObject = JSON.stringify({
        "request_id": "31d59dda-80e5-4721-8496-d0d32a654afe",
        "results": {
            "active": true,
            "address": {
            "address1": "One Apple Park Way",
            "city": "Cupertino",
            "postal_code": "95014",
            "state": "CA"
            },
            "branding": {
            "icon_url": "https://api.polygon.io/v1/reference/company-branding/d3d3LmFwcGxlLmNvbQ/images/2022-01-10_icon.png",
            "logo_url": "https://api.polygon.io/v1/reference/company-branding/d3d3LmFwcGxlLmNvbQ/images/2022-01-10_logo.svg"
            },
            "cik": "0000320193",
            "composite_figi": "BBG000B9XRY4",
            "currency_name": "usd",
            "description": "Apple designs a wide variety of consumer electronic devices, including smartphones (iPhone), tablets (iPad), PCs (Mac), smartwatches (Apple Watch), AirPods, and TV boxes (Apple TV), among others. The iPhone makes up the majority of Apple's total revenue. In addition, Apple offers its customers a variety of services such as Apple Music, iCloud, Apple Care, Apple TV+, Apple Arcade, Apple Card, and Apple Pay, among others. Apple's products run internally developed software and semiconductors, and the firm is well known for its integration of hardware, software and services. Apple's products are distributed online as well as through company-owned stores and third-party retailers. The company generates roughly 40% of its revenue from the Americas, with the remainder earned internationally.",
            "homepage_url": "https://www.apple.com",
            "list_date": "1980-12-12",
            "locale": "us",
            "market": "stocks",
            "market_cap": 2771126040150,
            "name": "Apple Inc.",
            "phone_number": "(408) 996-1010",
            "primary_exchange": "XNAS",
            "round_lot": 100,
            "share_class_figi": "BBG001S5N8V8",
            "share_class_shares_outstanding": 16406400000,
            "sic_code": "3571",
            "sic_description": "ELECTRONIC COMPUTERS",
            "ticker": "AAPL",
            "ticker_root": "AAPL",
            "total_employees": 154000,
            "type": "CS",
            "weighted_shares_outstanding": 16334371000
        },
        "status": "OK"
        });
        
        data = JSON.parse(exampleObject);
    res.json(data);

    //actual API pull here
    /*
    request.get({
        url: `https://api.polygon.io/v3/reference/tickers/${value}?apiKey=${key}`,
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
    "request_id": "31d59dda-80e5-4721-8496-d0d32a654afe",
    "results": {
        "active": true,
        "address": {
        "address1": "One Apple Park Way",
        "city": "Cupertino",
        "postal_code": "95014",
        "state": "CA"
        },
        "branding": {
        "icon_url": "https://api.polygon.io/v1/reference/company-branding/d3d3LmFwcGxlLmNvbQ/images/2022-01-10_icon.png",
        "logo_url": "https://api.polygon.io/v1/reference/company-branding/d3d3LmFwcGxlLmNvbQ/images/2022-01-10_logo.svg"
        },
        "cik": "0000320193",
        "composite_figi": "BBG000B9XRY4",
        "currency_name": "usd",
        "description": "Apple designs a wide variety of consumer electronic devices, including smartphones (iPhone), tablets (iPad), PCs (Mac), smartwatches (Apple Watch), AirPods, and TV boxes (Apple TV), among others. The iPhone makes up the majority of Apple's total revenue. In addition, Apple offers its customers a variety of services such as Apple Music, iCloud, Apple Care, Apple TV+, Apple Arcade, Apple Card, and Apple Pay, among others. Apple's products run internally developed software and semiconductors, and the firm is well known for its integration of hardware, software and services. Apple's products are distributed online as well as through company-owned stores and third-party retailers. The company generates roughly 40% of its revenue from the Americas, with the remainder earned internationally.",
        "homepage_url": "https://www.apple.com",
        "list_date": "1980-12-12",
        "locale": "us",
        "market": "stocks",
        "market_cap": 2771126040150,
        "name": "Apple Inc.",
        "phone_number": "(408) 996-1010",
        "primary_exchange": "XNAS",
        "round_lot": 100,
        "share_class_figi": "BBG001S5N8V8",
        "share_class_shares_outstanding": 16406400000,
        "sic_code": "3571",
        "sic_description": "ELECTRONIC COMPUTERS",
        "ticker": "AAPL",
        "ticker_root": "AAPL",
        "total_employees": 154000,
        "type": "CS",
        "weighted_shares_outstanding": 16334371000
    },
    "status": "OK"
    }
*/

app.post('/post', (req, res) => {
  res.send('post template');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});