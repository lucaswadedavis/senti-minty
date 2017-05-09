var port = process.argv[2] || process.env.PORT || 8081;

var express = require('express');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const fileName = process.cwd() + '/prior-art.json';

jsonfile.readFile(fileName, (e) => {
  if (e) jsonfile.writeFile(fileName, {}, (e) => {
    console.log(e);
  });
});

// Replace both of these with calls that actually retun sentiment analysis
app.get('/api', (req, res) => {
  jsonfile.readFile(fileName,(e, obj) => {
    if (e) return res.send(400, e);
    return res.send(200, obj);
  });
});

app.post('/api', (req, res) => {
  jsonfile.writeFile(fileName, req.body, {spaces: 2}, (e) => {
    return console.log(e)
  });
  return res.sendStatus(200, req.body);
});

app.listen(port, function () {
    console.log('Server started on port', port);
});
