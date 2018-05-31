const request = require('request');
const express = require('express')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

var api = require("./api.js")
api.init();

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/addDocument/:user/:type/:hash/:expires', (req, res) =>
        api.addDocument(req.params["user"],
                        req.params["hash"],
                        req.params["type"],
                        req.params["expires"]).then(function(result) {
                          res.send("ok");
                        }));

app.post('/api/addDocument', (req, res) =>
         var params = req.body;
         api.addDocument(req.params["user"],
                         params["hash"],
                         params["type"],
                         params["expires"]).then(function(result) {
                           res.send("ok");
                         })
        );

app.get('/api/valid/:user/:hash', (req, res) =>
        api.valid(req.params["user"], req.params["hash"]).then(function(result) {
          res.send(result);
        }));

app.post('/api/valid', (req, res) =>
         var params = req.body;
         api.valid(params["user"], params["hash"]).then(function(result) {
          res.send(result);
        }));

app.get('/api/isValidated/:user', (req, res) =>
        api.validated(req.params["user"]).then(function(result) {
          res.send(result);
        }));

app.post('/api/isValidated', (req, res) =>
         var params = req.body;
         api.validated(params["user"]).then(function(result) {
          res.send(result);
        }));

app.get('/api/validateUser/:user', (req, res) =>
        api.validateUser(req.params["user"]).then(function(result) {
          res.send(result);
        }));

app.post('api/validateUser', (req, res) =>
         var params = req.body;
         api.validateUser(params["user"]).then(function(result) {
          res.send(result);
        }));

app.get('/api/invalidateUser/:user', (req, res) =>
        api.invalidateUser(req.params["user"]).then(function(result) {
          res.send(result);
        }));

app.post('api/invalidateUser', (req, res) =>
         var params = req.body;
         api.invalidateUser(params["user"]).then(function(result) {
          res.send(result);
        }));

app.get('/api/isExpired/:user/:hash/', (req, res) =>
        api.isExpired(req.params["user"]).then(function(result) {
          res.send(result);
        }));

app.post('/api/isExpired', (req, res) =>
         var params = req.body;
         api.isExpired(params["user"]).then(function(result) {
          res.send(result);
        }));

app.listen(3000, () => console.log('API active on port 3000!'))

