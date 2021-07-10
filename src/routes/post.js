const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Story = require('../../models/Story');


router.post('/', (req, res) => {
  const newStory = req.body
  new Story(newStory).save().then(vote => {
    return res.json({ success: true, message: 'Story posted successfully' });
  }).catch(err=>{return {success:false, message:'Posting failed'}});
});

module.exports = router;
