var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://danillo:teste@ds161483.mlab.com:61483/tarefas', ['tarefas']);

router.get('/', function (req, res, next) {

    db.tarefas.find(function (error, tarefas) {

        if (error) {
            res.send(error);
            console.log(error);
        }

        res.json(tarefas);
    });

});

router.get('/:id', function (req, res, next) {

    db.tarefas.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (error, tarefa) {

        if (error) {
            res.send(error);
            console.log(error);
        }

        res.json(tarefa);
    });

});

router.delete('/:id', function (req, res, next) {

    db.tarefas.remove({ _id: mongojs.ObjectId(req.params.id) }, function (error, tarefa) {

        if (error) {
            res.send(error);
            console.log(error);
        }

        res.json(tarefa);
    });

});

router.put('/', function (req, res, next) {
    var tarefa = req.body;

    if (!tarefa.title || (tarefa.isDone + '')) {

        res.stataus(400);
        res.json({
            "error": "Requisição ruim!"
        });

    } else {

        db.tarefas.save(tarefa, function (error, tarefa) {
            if (error) {
                res.send(error);
                console.log(error);
            }
            res.json(task);
        });

    }

});

router.post('/', function (req, res, next) {
    var tarefa = req.body;

    if (!tarefa._id) {

        res.stataus(400);
        res.json({
            "error": "Tarefa não pode ser atualizada por que não existe no banco de dados!"
        });

    } else {

        db.tarefas.update({_id : mongojs.ObjectId(tarefa._id)}, tarefa, {}, function (error, tarefa) {
            if (error) {
                res.send(error);
                console.log(error);
            }
            res.json(task);
        });

    }

});


module.exports = router;