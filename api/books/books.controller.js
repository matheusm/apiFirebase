var admin = require('firebase-admin');
var fs = require('fs');
var ref = admin.database().ref('books');

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
    getBooks : function(req,res){

        ref.once('value',
            (result)=>{
                var books = result.val();
                checaVetorNulo(books);
                res.send(books);
            },
            (error)=>{
                res.send(error);
            }
        )


    },
    getBooksById : function(req,res){
        var id = req.params.id;
        
        ref.once('value',
            (result)=>{
                var books = result.val();
                checaVetorNulo(books);
                for (let i = 0; i < books.length; i++) {
                    var book = books[i];
                    if(book.id == id){
                        res.send(book);
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
    getBookByName : function(req,res){
        var nome = req.query.q;
        var vetor = [];
        ref.once('value',
            (result)=>{
                var books = result.val();
                checaVetorNulo(books);
                for (let i = 0; i < books.length; i++) {
                    var book = books[i];
                    if(book.nome == nome){
                        vetor.push(book);
                    }
                }
                comparaVetor(req,res,vetor);
            },
            (error)=>{
                res.send(error);
            }
        )

        
        
    },
    getBookByAutor : function(req,res){
        var autor = req.query.q;
        var vetor = [];

        ref.once('value',
            (result)=>{
                var books = result.val();
                checaVetorNulo(books);
                for (let i = 0; i < books.length; i++) {
                    var book = books[i];
                    if(book.autor == autor){
                        vetor.push(book);
                    }
                }
                comparaVetor(req,res,vetor);
            },
            (error)=>{
                res.send(error);
            }
        )

        
        
    },
    getBookByYear : function(req,res){
        var year = req.query.q;
        var vetor = [];

        ref.once('value',
            (result)=>{
                
                var books = result.val();
                
                for (let i = 0; i < books.length; i++) {
                    var book = books[i];
                    if(book.ano == year){
                        vetor.push(book);
                    }
                    
                }
                comparaVetor(req,res,vetor);
                
                
            },
            (error)=>{
                res.send(error);
            }
        )

        
        
    },
    updateBook : function(req,res){
        var bookUpdate = req.body;
        var aux = false;

        ref.once('value',
            (result)=>{
                var books = result.val();
                checaVetorNulo(books);
                
                for (let i = 0; i < books.length; i++) {
                    var book = books[i];
                    if(book.id == bookUpdate.id){
                        books[i] = bookUpdate;
                        aux = true;
                    }
                }
        
                if(!aux){
                    books.push(bookUpdate);
                }

                retornaSet(req,res,books);

            },
            (error)=>{
                res.send(error);
            }
        )
        
        
    },
    createBook : function(req,res){
        var newBook = req.body;
        ref.once('value',
            (resposta)=>{
                var books = resposta.val();
                if (!books) {
                    books = [];
                    ref = admin.database().ref('/books').child('0');
                    retornaSet(req,res,newBook);
                }else{
                    var books =  resposta.val();
                    books.push(newBook);
                    retornaSet(req,res,books);
                }
                
            },
            (error)=>{
                
            }
        );
        ref = admin.database().ref('books');
     
    },
    deleteBook : function(req,res){
        var id = req.params.id;
        ref.once('value',
            (resposta)=>{
                var books = resposta.val();
                checaVetorNulo(books);
                for (let i = 0; i < books.length; i++) {
                    var book = books[i];
                    if(book.id == id){
                        books.splice(i,1);
                    }
                }

                retornaSet(req,res,books);

            },
            (error)=>{
                res.send(error);
            }
        )

        

        

    }
}