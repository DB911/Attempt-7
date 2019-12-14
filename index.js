const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//set up express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

//initialise routes
app.use('/api', require('./routes/api'));

//error handling middleware
app.use(function(err, req, res, next)
{
  //console.log(err);
  res.status(422).send({error: err.message});
});

app.set('port', (process.env.PORT || 4000));

app.get('/api', function(req, res)
{
  console.log('GET Request');
  var result = 'App is running';
  res.send({name: 'Yoshi'});
}).listen(app.get('port'), function() {
    console.log('Now listening for Requests ', app.get('port'));
});


//listen for requests in processs environment port or port 4000
