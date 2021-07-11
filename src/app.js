const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cors = require('cors')
const mongoose = require('mongoose');
require('../config/db');
const Story = require('../models/Story');
const poll = require('./routes/poll');
const post = require('./routes/post');

const app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
hbs.registerHelper('json', function(context) {
  return JSON.stringify(context);
});


//This is just to simulate login of an user.
app.get('/user', (req, res) => {
  var a = ["Kevin", "John", "Aby"];
  var b = ["Kenny", "Mathew", "Antony"];
  var rA = Math.floor(Math.random() * a.length);
  var rB = Math.floor(Math.random() * b.length);
  //creating a random username
  var username = a[rA] + ' ' + b[rB] + '_' +Math.floor(Math.random() * 90 + 10);
  res.send({username})
})

app.get('', (req, res) => {
  res.render('index', {
    title: 'Planning Poker',
    name: 'Jesin'
  })
})

app.get('/list', async(req, res) => {
  Story.find({}).then(stories => {
    res.render('list', {
      title: 'Stories',
      name: 'Jesin',
      list: stories,
    })
  });
})

app.get('/story', (req, res) => {
  Story.find({_id:req.query.id}).then(story => {
        res.render('vote', {
          title: 'Poll',
          name: 'Jesin',
          estimates:['0',"1/2",'1','2','3','5','8','13'],
          story: story[0],
        })
      }
  );
});

// Enable CORS
app.use(cors());
app.use('/poll', poll);
app.use('/post', post);

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Jesin'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Jesin',
    errorMessage: 'Page not found.'
  })
})

const port = 3000;

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
