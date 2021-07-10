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
const storyService = require('./services/storyService')
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
const Vote = require('../models/Vote');

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
hbs.registerHelper('json', function(context) {
  return JSON.stringify(context);
});
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

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
// Enable CORS
app.use(cors());

app.use('/poll', poll);
app.use('/post', post);

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
app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Jesin'
  })
})

app.get('/autocomplete', async(req, res) => {

  let data = await purchaseOrderDBService.retrieveDistinctNames()
  res.send({ data })

});


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
