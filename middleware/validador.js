module.exports = {
    validadorID : function(req,res,next){
        var id = req.params.id;
        if(!isNaN(id)){
            next();
        }else{
            res.send({"error":"Parametro invalido."});
        }
    }
}