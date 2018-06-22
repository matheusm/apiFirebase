var admin = require('firebase-admin');
var fs = require('fs');
var ref = admin.database().ref('series');

function retornaSet(req,res,vetor){
    ref.set(vetor,(error)=>{
        if(error){
            res.send(error);
        }else{
            res.send(vetor);
        }
    });
}

function checaVetorNulo(req,res,vetor){
    if(!vetor){
        vetor=[];
    }
}

function comparaVetor(req,res,vetor){
    if(vetor){
        res.send(vetor);
    }else{
        res.status(404).send({});
    }
}

module.exports = {
    getSeries : function(req,res){

        ref.once('value',
            (result)=>{
                var series = result.val();
                checaVetorNulo(series);
                res.send(series);
            },
            (error)=>{
                res.send(error);
            }
        )


    },
    getSerieById : function(req,res){
        var id = req.params.id;
        
        ref.once('value',
            (result)=>{
                var series = result.val();
                checaVetorNulo(series);
                for (let i = 0; i < series.length; i++) {
                    var serie = series[i];
                    if(serie.id == id){
                        res.send(serie);
                        return;
                    }
                }
                res.status(404).send({});
            },
            (error)=>{
                res.send(error);
            }
        )

        
        
    },
    getSerieByName : function(req,res){
        var nome = req.query.q;
        var vetor = [];
        ref.once('value',
            (result)=>{
                var series = result.val();
                checaVetorNulo(series);
                for (let i = 0; i < series.length; i++) {
                    var serie = series[i];
                    if(serie.nome == nome){
                        vetor.push(serie);
                    }
                }
                comparaVetor(req,res,vetor);
            },
            (error)=>{
                res.send(error);
            }
        )

        
        
    },
    getSerieByAutor : function(req,res){
        var autor = req.query.q;
        var vetor = [];

        ref.once('value',
            (result)=>{
                var series = result.val();
                checaVetorNulo(series);
                for (let i = 0; i < series.length; i++) {
                    var serie = series[i];
                    if(serie.autor == autor){
                        vetor.push(serie);
                    }
                }
                comparaVetor(req,res,vetor);
            },
            (error)=>{
                res.send(error);
            }
        )

        
        
    },
    getSerieByYear : function(req,res){
        var year = req.query.q;
        var vetor = [];

        ref.once('value',
            (result)=>{
                
                var series = result.val();
                
                for (let i = 0; i < series.length; i++) {
                    var serie = series[i];
                    if(serie.ano == year){
                        vetor.push(serie);
                    }
                    
                }
                comparaVetor(req,res,vetor);
                
                
            },
            (error)=>{
                res.send(error);
            }
        )

        
        
    },
    updateSerie : function(req,res){
        var serieUpdate = req.body;
        var aux = false;

        ref.once('value',
            (result)=>{
                var series = result.val();
                checaVetorNulo(series);
                
                for (let i = 0; i < series.length; i++) {
                    var serie = series[i];
                    if(serie.id == serieUpdate.id){
                        series[i] = serieUpdate;
                        aux = true;
                    }
                }
        
                if(!aux){
                    series.push(serieUpdate);
                }

                retornaSet(req,res,series);

            },
            (error)=>{
                res.send(error);
            }
        )
        
        
    },
    createSerie : function(req,res){
        var newSerie = req.body;
        ref.once('value',
            (resposta)=>{
                var series = resposta.val();
                if (!series) {
                    series = [];
                    ref = admin.database().ref('/series').child('0');
                    retornaSet(req,res,newSerie);
                }else{
                    var series =  resposta.val();
                    series.push(newSerie);
                    retornaSet(req,res,series);
                }
                
            },
            (error)=>{
                
            }
        );
        ref = admin.database().ref('series');
     
    },
    deleteSerie : function(req,res){
        var id = req.params.id;
        ref.once('value',
            (resposta)=>{
                var series = resposta.val();
                checaVetorNulo(series);
                for (let i = 0; i < series.length; i++) {
                    var serie = series[i];
                    if(serie.id == id){
                        series.splice(i,1);
                    }
                }

                retornaSet(req,res,series);

            },
            (error)=>{
                res.send(error);
            }
        )

        

        

    }
}