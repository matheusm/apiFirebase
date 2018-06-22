var express = require('express');
var controller = require('./movies.controller');
var validador = require('../../middleware/validador');
var router = express.Router();

router.get('/autor', controller.getMoviesByAutor);
router.get('/ano', controller.getMoviesByYear);
router.get('/name', controller.getMoviesByName);
router.get('/list', controller.getMovies);
router.get('/:id' , controller.getMoviesById);

router.post('/', controller.updateMovies);

router.put('/', controller.createMovies);

router.delete('/:id', validador.validadorID , controller.deleteMovies);


module.exports = router;