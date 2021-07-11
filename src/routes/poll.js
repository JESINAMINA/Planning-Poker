const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Vote = require('../../models/Vote');
const Pusher = require('pusher');
const keys = require('../../config/keys');

var pusher = new Pusher({
  appId: keys.pusherAppId,
  key: keys.pusherKey,
  secret: keys.pusherSecret,
  cluster: keys.pusherCluster,
  encrypted: keys.pusherEncrypted
});

router.get('/', (req, res) => {
  Vote.find({story_id: req.query.storyId}).then(votes => {
    res.json({success: true, votes: votes})
  });
});
router.post('/', (req, res) => {

  Vote.find({story_id: req.body.storyId, user: req.body.userId}).then(votes => {
    if (votes.length) {
      Vote.findOneAndRemove(
          {story_id: req.body.storyId, user: req.body.userId}).then(resp => {
            console.log(resp)
            postNewVote(votes[0].estimate)
          }
      )
    } else {
      postNewVote()
    }
  });

  function postNewVote(removed = '') {
    const newVote = {
      story_id: req.body.storyId,
      user: req.body.userId,
      estimate: req.body.os,
      points: 1
    };
    new Vote(newVote).save().then(vote => {
      pusher.trigger('planning-poll', 'estimate-vote', {
        points: parseInt(vote.points),
        os: vote.estimate,
        removed: removed
      });
      return res.json({success: true, message: 'Thank you for voting'});
    });
  }
});

module.exports = router;
