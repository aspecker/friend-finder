const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './app/public')));

require ('./app/routing/apiRoutes.js')(app);
require ('./app/routing/htmlRoutes.js')(app);

app.listen(PORT, function () {
    console.log('Listening on '+PORT);
});