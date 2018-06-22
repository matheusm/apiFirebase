const express = require('express');
const bodyParser = require('body-parser');
var admin = require("firebase-admin");
var serviceAccount = require("./firebase-config.json");
var routers = require('./routers');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://handtalkapi.firebaseio.com"
});

routers.routeMovies(app);
routers.routeSeries(app);
routers.routeBooks(app);
routers.routeHqs(app);

app.listen(PORT, ()=>{
    console.log('Servidor em http://localhost:'+PORT);
})



