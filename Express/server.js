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
    const data = JSON.parse('{"ticker":"AAPL","queryCount":24,"resultsCount":24,"adjusted":true,"results":[{"v":7.0790813e+07,"vw":131.6292,"o":130.465,"c":130.15,"h":133.41,"l":129.89,"t":1673240400000,"n":645365},{"v":6.3896155e+07,"vw":129.822,"o":130.26,"c":130.73,"h":131.2636,"l":128.12,"t":1673326800000,"n":554940},{"v":6.9458949e+07,"vw":132.3081,"o":131.25,"c":133.49,"h":133.51,"l":130.46,"t":1673413200000,"n":561278},{"v":7.1379648e+07,"vw":133.171,"o":133.88,"c":133.41,"h":134.26,"l":131.44,"t":1673499600000,"n":635331},{"v":5.7809719e+07,"vw":133.6773,"o":132.03,"c":134.76,"h":134.92,"l":131.66,"t":1673586000000,"n":537385},{"v":6.3612627e+07,"vw":135.7587,"o":134.83,"c":135.94,"h":137.29,"l":134.13,"t":1673931600000,"n":595831},{"v":6.96728e+07,"vw":136.3316,"o":136.815,"c":135.21,"h":138.61,"l":135.03,"t":1674018000000,"n":578304},{"v":5.8280413e+07,"vw":134.9653,"o":134.08,"c":135.27,"h":136.25,"l":133.77,"t":1674104400000,"n":491674},{"v":8.0200655e+07,"vw":136.3762,"o":135.28,"c":137.87,"h":138.02,"l":134.22,"t":1674190800000,"n":552230},{"v":8.1760313e+07,"vw":141.2116,"o":138.12,"c":141.11,"h":143.315,"l":137.9,"t":1674450000000,"n":719288},{"v":6.6435142e+07,"vw":142.0507,"o":140.305,"c":142.53,"h":143.16,"l":140.3,"t":1674536400000,"n":498679},{"v":6.5799349e+07,"vw":140.7526,"o":140.89,"c":141.86,"h":142.43,"l":138.81,"t":1674622800000,"n":536505},{"v":5.4105068e+07,"vw":143.3429,"o":143.17,"c":143.96,"h":144.25,"l":141.9,"t":1674709200000,"n":472135},{"v":7.0547743e+07,"vw":145.8365,"o":143.155,"c":145.93,"h":147.23,"l":143.08,"t":1674795600000,"n":560022},{"v":6.4015274e+07,"vw":143.6524,"o":144.955,"c":143,"h":145.55,"l":142.85,"t":1675054800000,"n":551111},{"v":6.5874459e+07,"vw":143.6473,"o":142.7,"c":144.29,"h":144.34,"l":142.28,"t":1675141200000,"n":468170},{"v":7.7663426e+07,"vw":143.8723,"o":143.97,"c":145.43,"h":146.61,"l":141.32,"t":1675227600000,"n":693374},{"v":1.1833898e+08,"vw":149.3764,"o":148.9,"c":150.82,"h":151.18,"l":148.17,"t":1675314000000,"n":996203},{"v":1.54338835e+08,"vw":154.2437,"o":148.03,"c":154.5,"h":157.38,"l":147.83,"t":1675400400000,"n":1141350},{"v":6.9771906e+07,"vw":152.0939,"o":152.575,"c":151.73,"h":153.1,"l":150.78,"t":1675659600000,"n":583517},{"v":8.3322551e+07,"vw":153.4202,"o":150.64,"c":154.65,"h":155.23,"l":150.64,"t":1675746000000,"n":661767},{"v":6.3620079e+07,"vw":152.3636,"o":153.88,"c":151.92,"h":154.58,"l":151.168,"t":1675832400000,"n":524140},{"v":5.5994243e+07,"vw":152.2769,"o":153.775,"c":150.87,"h":154.33,"l":150.42,"t":1675918800000,"n":471973},{"v":5.7388108e+07,"vw":150.4054,"o":149.46,"c":151.01,"h":151.3401,"l":149.22,"t":1676005200000,"n":443405}],"status":"OK","request_id":"3c92f89175acf33f713a3d72f31e5f5d","count":24}');
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

    //actual API pull here - documention: https://polygon.io/docs/stocks/get_v3_reference_tickers__ticker
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

app.get('/notifications', (req, res) => {
    const notifications = [
        {
          id: 1,
          name: "New Message",
          message: "You have a new message from John",
          type: "message",
          timestamp: "2024-11-08T10:20:00Z",
        },
        {
          id: 2,
          name: "Friend Request",
          message: "Alice sent you a friend request",
          type: "friend_request",
          timestamp: "2024-11-08T10:30:00Z",
        },
      ];
    res(notifications);
});

app.post('/post', (req, res) => {
  res.send('post template');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});