var port = process.argv[2] || process.env.PORT || 8081;

var bodyParser = require('body-parser');
var express = require('express');
var sentiment = require('sentiment');

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.post('/api', (req, res) => {
  return res.status(200).send(sentiment(req.body.data));
});

app.listen(port, function () {
    console.log('Server started on port', port);
});
