var express = require('express');
var controller = require('./series.controller');
var validador = require('../../middleware/validador');
var router = express.Router();

router.get('/autor', controller.getSerieByAutor);
router.get('/ano', controller.getSerieByYear);
router.get('/name', controller.getSerieByName);
router.get('/list', controller.getSeries);
router.get('/:id' , controller.getSerieById);

router.post('/', controller.updateSerie);

router.put('/', controller.createSerie);

router.delete('/:id', validador.validadorID , controller.deleteSerie);


module.exports = router;