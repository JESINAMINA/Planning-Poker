const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//
// const VoteSchema = new Schema({
//   os: {
//     type: String,
//     required: true
//   },
//   points: {
//     type: String,
//     required: true
//   }
// });

// Create collection and add schema
// const Vote = mongoose.model('Vote', VoteSchema);

// module.exports = Vote;


const VoteSchema = new Schema({
  story_id: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  estimate: {
    type: String,
    required: true
  },
  points: {
    type: String,
    required: true
  }
});

// Create collection and add schema
const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;


