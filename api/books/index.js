var express = require('express');
var controller = require('./books.controller');
var validador = require('../../middleware/validador');
var router = express.Router();

router.get('/autor', controller.getBookByAutor);
router.get('/ano', controller.getBookByYear);
router.get('/name', controller.getBookByName);
router.get('/list', controller.getBooks);
router.get('/:id' , controller.getBooksById);

router.post('/', controller.updateBook);

router.put('/', controller.createBook);

router.delete('/:id', validador.validadorID , controller.deleteBook);


module.exports = router;