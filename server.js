const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//middleware logger
app.use ((req, res, next) => {
  var now = new Date().toString();

  var log = (`${now}: ${req.method}  ${req.url}`);
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  } )
  next();
});

// //maintenance middleware
// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// });

//static directory
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to this website'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

// /bad - send back jason with errorMessage

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'bad request'
  })
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});