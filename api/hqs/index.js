var express = require('express');
var controller = require('./hqs.controller');
var validador = require('../../middleware/validador');
var router = express.Router();

router.get('/autor', controller.getHqsByAutor);
router.get('/ano', controller.getHqsByYear);
router.get('/name', controller.getHqsByName);
router.get('/list', controller.getHqs);
router.get('/:id' , controller.getHqsById);

router.post('/', controller.updateHqs);

router.put('/', controller.createHqs);

router.delete('/:id', validador.validadorID , controller.deleteHqs);


module.exports = router;