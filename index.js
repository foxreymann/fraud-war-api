var express = require('express');
var app = express();

var quotes = [
  { author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"},
  { author : 'Walt Disney', text : "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you"},
  { author : 'Unknown', text : "Even the greatest was once a beginner. Don’t be afraid to take that first step."},
  { author : 'Neale Donald Walsch', text : "You are afraid to die, and you’re afraid to live. What a way to exist."}
];

var applications = [];

  var fraudScore = 15;

app.use(express.bodyParser());


app.get('/', function(req, res) {
  res.json(applications);
});

app.get('/quote/random', function(req, res) {
  var id = Math.floor(Math.random() * quotes.length);
  var q = quotes[id];
  res.json(q);
});

app.get('/quote/:id', function(req, res) {
  if(quotes.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No quote found');
  }

  var q = quotes[req.params.id];
  res.json(q);
});

app.post('/quote', function(req, res) {
  if(!req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('text')) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }

  var newQuote = {
    author : req.body.author,
    text : req.body.text
  };

  quotes.push(newQuote);
  res.json(true);
});

app.delete('/quote/:id', function(req, res) {
  if(quotes.length <= req.params.id) {
    res.statusCode = 404;
    return res.send('Error 404: No quote found');
  }

  quotes.splice(req.params.id, 1);
  res.json(true);
});

app.post('/', function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  function compare(application, index, array) {
    if (application.lastName !== newApplication.lastName) {
      if(application.fingerprint === newApplication.fingerprint) {
        res.json({fraudScore: 30});
      }
    }
  }

  var newApplication = {
    lastName: req.body.lastName,
    fingerprint: req.body.fingerprint
  };

  applications.forEach(compare);

  applications.push(newApplication);

  res.json({fraudScore: 15});
});

app.listen(process.env.PORT || 1112);
