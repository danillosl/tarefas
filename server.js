var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var home = require('./routes/home');
var tasks = require('./routes/tasks');

var port = 3000;

var app = express();

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

app.use('/', home);
app.use('/api/tarefas', tasks);

app.listen(port, function () {
    console.log('Server iniciado na porta ' + port);
});