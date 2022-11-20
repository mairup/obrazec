const express = require('express');
const app = express();
const {readFile} = require('fs').promises;

app.use(express.static('public'));

app.get('/',  async(request, response) => {

    response.send(await readFile('public/home.html','utf8'));

});

app.listen(process.env.PORT || 3000, ()=> console.log('App available on http://localhost:3000'))