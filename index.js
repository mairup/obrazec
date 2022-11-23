var SHA256 = require("crypto-js/sha256");

const express = require('express');
const app = express();
const {readFile} = require('fs').promises;
const bodyParser = require("body-parser");

const items = require('./items.json');


app.use(express.static('public'));
app.use(bodyParser.json());

global.secretMessage = '245b22dce938051efc28cf4364928fa26e171db139755311a93703ba65fd6d07';
// "SecurePassword123" in SHA256

app.get('/',  async(request, response) => {
    response.send(await readFile('public/home.html','utf8'));
});


app.route("/Obrazec")
.post(function(req,res){
    switch (req.body.function) {
        case "return-object":
            res.send({response:items});
            break;
        
        case "return-password-check":
            if (SHA256(req.body.password)=="245b22dce938051efc28cf4364928fa26e171db139755311a93703ba65fd6d07") {
                res.send({response:"true"});
            }else res.send({response:"false"});
            break;
        default:
            res.send({response:"error"});
            break;
    }
})


app.listen(process.env.PORT || 3000, ()=> console.log('App available on http://localhost:3000'))

//npm run devStart