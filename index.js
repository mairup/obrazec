const express = require('express');
const app = express();
const {readFile} = require('fs').promises;

const items = require('./items.json');

app.use(express.static('public'));

global.secretMessage = 'A secret message';

app.get('/',  async(request, response) => {

    response.send(await readFile('public/home.html','utf8'));

});



app.route("/ajax")
.post(function(req,res){
    res.send({response:items});
})

app.listen(process.env.PORT || 3000, ()=> console.log('App available on http://localhost:3000'))