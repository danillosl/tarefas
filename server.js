var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

var tasks = require('./routes/tasks');

var port = 3000;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/tarefas', tasks);

app.get('*', function (req, res) {
    res.sendfile(path.join(__dirname, 'views/index.html'));
})

app.listen(port, function () {
    console.log('Server iniciado na porta ' + port);
});