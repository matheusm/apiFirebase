

module.exports = {
    routeMovies : function(app){
        app.use('/api/movies', require('./api/movies'))
    },
    routeSeries : function(app){
        app.use('/api/series',require('./api/series'))
    },
    routeBooks : function(app){
        app.use('/api/books', require('./api/books'))
    },
    routeHqs : function(app){
        app.use('/api/hqs',require('./api/hqs'))
    }
}